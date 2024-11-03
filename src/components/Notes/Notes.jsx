'use client';
import React, { useEffect, useState } from 'react';

import { RiStickyNoteAddLine } from 'react-icons/ri';
import Modal from 'react-modal';
import './modal.css';
import useAxiosCommon from '@/lib/axiosCommon';

import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const Notes = ({ callrefetch }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;

  const axiosCommon = useAxiosCommon();
  const [loading, setLoading] = useState(false);

  const [createNote, setCreateNote] = useState(false);
  const [note, setNote] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const [text, setText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const now = new Date();

    // Convert to GMT+6
    const gmt6Offset = 6 * 60 * 60 * 1000;
    const gmt6Date = new Date(now.getTime() + gmt6Offset);

    // Format date as YYYY-MM-DD
    const year = gmt6Date.getUTCFullYear();
    const month = String(gmt6Date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(gmt6Date.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Format time as HH:MM AM/PM
    let hours = gmt6Date.getUTCHours();
    const minutes = String(gmt6Date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    // Set the formatted date and time
    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  }, []);

  // Fetch tasks data
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['my-notes'],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/note/notes/my-notes/${uemail}`);
      setNote(data);
      setFilteredNotes(data);
      return data;
    },
  });

  const handleSearch = () => {
    setFilteredNotes(
      note.filter(note => {
        if (note.title.toLowerCase().match(text.toLowerCase())) {
          return note;
        }
      })
    );
  };

  useEffect(handleSearch, [text, note]);

  // Create Note
  const handleOpenCreateNote = e => {
    setCreateNote(e);
  };

  const handleCloseCreateNote = () => {
    setCreateNote(false);
  };

  // Post Note data
  const { mutateAsync: addTaskMutation } = useMutation({
    mutationFn: async NoteData => {
      const { data } = await axiosCommon.post(`/note/notes`, NoteData);
      return data;
    },
    onSuccess: () => {
      toast.success('Note Created Successfully!');
      refetch(); // Refetch task data
      setLoading(false);
      callrefetch();
      setCreateNote(false);
      setTitle('');
      setCategory('');
      setDetails('');
    },
    onError: err => {
      toast.error(err.message);
      setLoading(false);
    },
  });

  // Form handler for adding task
  const handleAddNote = async () => {
    setLoading(true);
    try {
      const newNote = {
        email: uemail,

        title: title,
        category: category,
        details: details,

        ndate: currentDate,
        ntime: currentTime,
      };

      await addTaskMutation(newNote);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="pt-2">
      {/* <div className=" flex flex-col shadow-lg w-full items-center pt-4 gap-4 rounded-xl p-4 bg-gradient-to-b from-blue-600 to-bgColor hover:shadow-md hover:shadow-sky-200 duration-500">
        <p className="text-4xl md:text-5xl font-extrabold text-white font-['Poppu']">
          MY Notes
        </p>
        <form action="" className="max-w-[480px] w-full px-4">
          <div className="relative">
            <input
              type="text"
              name="q"
              className="w-full border h-12 shadow p-4 rounded-full"
              onChange={(e) => {
                setText(e.target.value);
                handleSearch();
              }}
              placeholder="search note"
            />
          </div>
        </form>
      </div> */}

      <div className="flex mb-4 justify-end">
        <button
          onClick={() => handleOpenCreateNote(true)}
          className="px-6 py-3 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group  dark:bg-gray-50 text-white`"
        >
          <RiStickyNoteAddLine className="self-center text-white text-lg font-extrabold" />
          Create a Note
        </button>
      </div>

      {createNote === true ? (
        <Modal
          isOpen={createNote}
          onRequestClose={handleCloseCreateNote}
          contentLabel="Task Details Modal"
          className="modal-dialog"
          overlayClassName="modal-overlay"
        >
          <div className="modal-content">
            <div className="modal-body">
              <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-sm">
                  <div className="relative rounded-2xl bg-white p-6 shadow dark:bg-[#181024] dark:border-[#3e1878c2]">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className=" modal-title text-xl font-semibold text-gray-900 dark:text-white">Create a new Note</h2>

                      <button onClick={handleCloseCreateNote} className="close right-5 top-5 text-gray-400 hover:text-gray-600">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>

                    <Input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="mb-3   w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Note Title"
                    />

                    <Input
                      type="text"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="mb-3  w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Note Catrgory"
                    />
                    <Textarea
                      type="text"
                      value={details}
                      onChange={e => setDetails(e.target.value)}
                      className="mb-3  w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder="Your Note..."
                    ></Textarea>

                    <button
                      onClick={handleAddNote}
                      className="px-6 py-3 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group  dark:bg-gray-50 w-full text-center justify-center"
                    >
                      Create Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ''
      )}
    </div>
  );
};

export default Notes;
