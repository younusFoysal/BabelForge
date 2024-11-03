'use client';
import { useState } from 'react';
import useAxiosCommon from '@/lib/axiosCommon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IoTrashOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import Image from 'next/image';
import inbox from '@/image/inbox/message-inbox.png';
import userIcon from '@/image/inbox/user.png';
import { useUser } from '@clerk/nextjs';
import Notes from '../Notes/Notes';
import { toast } from '@/hooks/use-toast';
import HomeLoadingSpinner from '../shared/HomeLoadingSpinner/HomeLoadingSpinner';
import Alert from '../shared/Alert';
import Modal from 'react-modal';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

const Note = () => {
  const { user, isLoaded } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const [selectedMessage, setSelectedMessage] = useState(null);

  const axiosCommon = useAxiosCommon();

  const [loading, setLoading] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const { data: notes = [], refetch } = useQuery({
    queryKey: ['my-notes', user, isLoaded],
    enabled: !isLoaded || !!user,
    queryFn: async () => {
      const res = await axiosCommon.get(`/note/notes/my-notes/${uemail}`);
      return res.data;
    },
  });

  const { mutateAsync: updateNoteMutation } = useMutation({
    mutationFn: async note => {
      const NoteWithoutID = { ...note };
      delete NoteWithoutID._id; // Remove the _id field before patching
      const { data } = await axiosCommon.patch(`/note/notes/update/${selectedMessage._id}`, NoteWithoutID);
      return data;
    },
    onSuccess: () => {
      toast({
        description: 'Task updated successfully!',
        variant: 'success',
      });
      refetch();
    },
    onError: err => {
      toast({
        description: err.message,
        variant: 'error',
      });
    },
  });

  // Handle form submit to update Note
  const handleEditSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const utitle = form.utitle.value;
    const ucategory = form.ucategory.value;
    const udetails = form.udetails.value;

    const updatedNote = {
      _id: selectedMessage._id,
      title: utitle,
      category: ucategory,
      details: udetails,
    };

    // console.log(updatedNote);

    try {
      await updateNoteMutation(updatedNote);
      setSelectedMessage(updatedNote);
      closeEditModal();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle delete
  const handleDelete = async id => {
    const res = await axiosCommon.delete(`/note/notes/${id}`);
    if (res.data.deletedCount > 0) {
      toast({
        description: 'Note deleted',
        variant: 'success',
      });
      setSelectedMessage(null);
      refetch();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setFormData({});
  };

  // Open the selected mail
  const openMail = (message, id) => {
    setSelectedMessage(message);
  };

  if (!isLoaded) return <HomeLoadingSpinner />;

  return (
    <div>
      <Notes callrefetch={refetch} />
      <section>
        <div className="h-screen  flex flex-col lg:flex-row rounded-3xl bg-blue-100 dark:bg-[#181024] gray-900">
          {/* Sidebar containing messages */}
          <div className="w-full  lg:w-1/3  rounded-3xl dark:bg-[#181024] gray-800 p-4 overflow-y-auto custom-scrollbar">
            <div className="bg-white rounded-3xl dark:bg-[#181024] border dark:border-[#3e1878c2]  gray-700">
              <div>
                {notes?.map((message, index) => (
                  <div
                    key={message?._id}
                    onClick={() => openMail(message, message?._id)}
                    className={`cursor-pointer border-b-[1px] hover:border-b-4 hover:border-[#3e1878c2]  p-4 shadow-sm hover:bg-slate-200 dark:hover:bg-[#200e3be2] transition-all flex flex-col justify-between h-full relative ${
                      index === 0 ? 'rounded-t-3xl' : index === notes.length - 1 ? 'rounded-b-3xl' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <Image
                        alt=""
                        className="w-12 h-12 rounded-full  dark:bg-[#181024] gray-500  "
                        src={userIcon}
                        width={400}
                        height={400}
                      />
                      <div className="w-full">
                        <div>
                          <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[calc(100%-70px)]  ">
                            {message?.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-normal line-clamp-2 mt-3">
                            {message?.details}
                          </p>
                        </div>
                        <div className="absolute top-5 right-4">
                          <p className="text-sm text-gray-400 dark:text-gray-400">{message?.ntime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="overflow-hidden w-full lg:w-2/3 bg-blue-100  lg:block hidden dark:bg-[#181024] gray-800">
            <div className="h-full">
              {!selectedMessage ? (
                <div className="flex justify-center items-center h-full">
                  <div className="text-center">
                    <Image className="lg:block hidden object-cover object-center " src={inbox} alt="fire" height={400} width={400}></Image>
                    <p className="text-xl font-semibold ">No Conversation Selected</p>
                  </div>
                </div>
              ) : (
                <div className="h-full p-4 dark:bg-[#181024] gray-800">
                  <div className="bg-white border dark:border-[#3e1878c2] dark:bg-[#181024] gray-700 shadow w-full rounded-full mb-6 px-2">
                    <div className="w-full flex justify-between  py-2">
                      <h3 className="text-base flex items-center gap-[4px] pl-2">
                        <span>
                          <HiOutlineOfficeBuilding />
                        </span>
                        {selectedMessage?.category}
                      </h3>
                      <p>
                        <span
                          onClick={() => setIsEditModalOpen(true)}
                          className="px-4 py-2 capitalize hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:text-white rounded-full transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group border border-purple-600/50 text-black hover:text-white"
                        >
                          <button>Update</button>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border dark:border-[#3e1878c2] dark:bg-[#181024] gray-700 p-6 rounded-3xl lg:h-96 pb-10 relative">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-1">
                      <div className="flex gap-3">
                        <Image alt="" className="w-10 h-10 rounded-full  dark:bg-[#181024] gray-500  " src={userIcon} width="" height="" />
                        <div>
                          <p className="text-base font-bold text-gray-900 dark:text-gray-100">{selectedMessage?.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{selectedMessage?.email}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-8">
                        <div className="text-right mt-2 md:mt-0">
                          <p className="text-gray-800 text-sm dark:text-gray-300">{selectedMessage?.ntime}</p>
                        </div>
                        <Alert onContinue={() => handleDelete(selectedMessage?._id)}>
                          {openDialog => (
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                openDialog();
                              }}
                              className="p-2 rounded-full hover:bg-red-200 dark:hover:bg-[#3e1878c2] "
                            >
                              <IoTrashOutline className="text-black text-lg dark:text-red-400" />
                            </button>
                          )}
                        </Alert>
                      </div>
                    </div>

                    <hr className="border-gray-300 dark:border-gray-600 mb-4 mt-3" />

                    <div className="text-lg text-gray-900 dark:text-gray-100">{selectedMessage?.details}</div>

                    <p className="absolute bottom-4 right-4 text-gray-800 text-sm dark:text-gray-300">{selectedMessage?.ndate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile view or small device view */}
          <div
            className={`fixed pt-20 md:px-20 lg:px-0 px-2 inset-0 bg-gray-900 bg-opacity-50 lg:hidden z-50 ${
              selectedMessage ? 'flex' : 'hidden'
            } flex-col p-4`}
          >
            <div className="bg-white dark:bg-[#181024] gray-800 rounded-lg p-6 overflow-y-auto max-h-80">
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{selectedMessage?.title}</p>
              <h2 className="text-md font-medium text-gray-900 dark:text-gray-100">{selectedMessage?.companyName}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{selectedMessage?.email}</p>
              <div className="border-b border-gray-300 dark:border-gray-600 mb-2 mt-2"></div>
              <p className="text-lg text-gray-900 dark:text-gray-100">{selectedMessage?.details}</p>
              <button onClick={() => setSelectedMessage(null)} className="mt-4 px-4 py-2 bg-gray-700 text-white rounded">
                Close
              </button>
            </div>
          </div>

          {/*edit Modal*/}
          {isEditModalOpen === true ? (
            <Modal
              isOpen={isEditModalOpen}
              onRequestClose={closeEditModal}
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
                          <h2 className=" modal-title text-xl font-semibold text-gray-900 dark:text-white">Update the Note</h2>

                          <button onClick={closeEditModal} className="close right-5 top-5 text-gray-400 hover:text-gray-600">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>

                        <form onSubmit={handleEditSubmit}>
                          <label className="text-sm pl-1">Title:</label>
                          <Input
                            className="mb-3  w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue={selectedMessage?.title}
                            name="utitle"
                          />
                          <label className="text-sm pl-1">Category:</label>
                          <Input
                            className="mb-3  w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            defaultValue={selectedMessage?.category}
                            name="ucategory"
                          />
                          <label className="text-sm pl-1">Details:</label>
                          <Textarea
                            className="mb-3  w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            defaultValue={selectedMessage?.details}
                            name="udetails"
                            placeholder="Your Note..."
                          ></Textarea>

                          <button
                            type="submit"
                            className="px-6 py-3 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group  dark:bg-gray-50 w-full text-center justify-center"
                          >
                            Update
                          </button>
                        </form>
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
      </section>
    </div>
  );
};

export default Note;
