'use client';

import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

import { MdMarkEmailRead, MdOutlineMessage } from 'react-icons/md';

import { TbStar } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { IoTrashOutline } from 'react-icons/io5';

const AdminInbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const axiosCommon = useAxiosCommon();

  // get All messages
  const { data: messages = [], refetch } = useQuery({
    queryKey: ['admin-inbox'],
    queryFn: async () => {
      const res = await axiosCommon.get('/message/messages');
      return res.data;
    },
  });

  // open mail
  const openMail = message => {
    setSelectedMessage(message);
  };

  // back to inbox
  const goBackToInbox = () => {
    setSelectedMessage(null);
  };

  // handle delete
  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Delete this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7066e3',
      cancelButtonColor: '#707a83',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        //
        const res = await axiosCommon.delete(`/message/messages/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: 'Deleted!',
            text: `Message has been deleted`,
            icon: 'success',
          });
          refetch();
        }
      }
    });
  };

  return (
    <div>
      {/* container */}
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">All Message Inbox</h1>

          {/* Message details */}
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow-md p-4">
              <button className="text-blue-500 mb-4" onClick={goBackToInbox}>
                &larr; Back to Inbox
              </button>
              <h2 className="text-lg font-bold">{selectedMessage.companyName}</h2>
              <p className="text-gray-600 space-x-1">
                <span>{selectedMessage.firstName}</span>
                <span>{selectedMessage.lastName}</span>
              </p>
              <p className="text-gray-500">{selectedMessage.email}</p>
              <p className="text-gray-800 space-x-2">
                <span>{selectedMessage.mdate},</span>
                <span>{selectedMessage.mtime}</span>
              </p>
              <p className="mt-4 text-lg text-black">{selectedMessage.helpMessage}</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#ffffff16] rounded-lg shadow-md">
              {/* messages show in table*/}
              <div className="overflow-x-auto ">
                <table className="min-w-full  border-collapse">
                  <tbody className="">
                    {messages.map(message => (
                      <tr
                        key={message.id}
                        className="hover:bg-gray-100 dark:hover:bg-[#ffffff27] dark:bg-transparent cursor-pointer border-b dark:border-[#ffffff3c] "
                        onClick={() => openMail(message)}
                      >
                        <td className="px-4 py-2 flex items-center">
                          <span className="text-xl mr-3">
                            <TbStar />
                          </span>
                          <MdMarkEmailRead className="h-6 w-6 text-blue-600 mr-2" />
                          <span className="mr-1">{message.firstName} </span>
                          {message.lastName}
                        </td>
                        <td className="px-4 py-2 truncate w-1/2 max-w-[200px] text-left">{message.helpMessage}</td>
                        <td className="px-4 py-2 text-right">{message.mtime}</td>
                        <td className="px-4  text-right ">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleDelete(message._id);
                            }}
                            className="p-2 rounded-full text-xl hover:bg-gray-300 dark:hover:text-black transition duration-200"
                          >
                            <IoTrashOutline />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInbox;
