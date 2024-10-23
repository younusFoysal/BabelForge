'use client';

import { useState } from 'react';
import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';
import { IoTrashOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

const AdminInbox = () => {
  //  selected message
  const [selectedMessage, setSelectedMessage] = useState(null);
  // delete icon is hovered 
  const [isDeleteHover, setIsDeleteHover] = useState(false); 
  const axiosCommon = useAxiosCommon();

  // Fetch all messages
  const { data: messages = [], refetch } = useQuery({
    queryKey: ['admin-inbox'],
    queryFn: async () => {
      const res = await axiosCommon.get('/message/messages');
      return res.data;
    },
  });

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Delete this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7066e3',
      cancelButtonColor: '#707a83',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosCommon.delete(`/message/messages/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Message has been deleted',
            icon: 'success',
          });
          refetch();
        }
      }
    });
  };

  // Open the selected mail
  const openMail = (message) => {
    setSelectedMessage(message);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-900">
      {/* Sidebar containing messages */}
      <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-200">Inbox</h2>
        <div className="space-y-4">
          {messages?.map((message) => (
            <div
              key={message?._id}
              onClick={() => openMail(message)}
              // Apply a class to remove hover effects when delete icon is hovered
              className={`cursor-pointer bg-white dark:bg-gray-700 p-4 rounded-lg shadow 
                ${isDeleteHover ? 'hover:bg-transparent' : 'hover:bg-gray-200 dark:hover:bg-gray-600'} 
                transition-all flex flex-col justify-between h-full`}
            >
              {/* Name and Message */}
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {message?.firstName} {message?.lastName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-normal line-clamp-2">
                  {message?.helpMessage}
                </p>
              </div>
      
              {/* Bottom Section Date and Delete Icon */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-400 dark:text-gray-400">{message?.mdate}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleDelete(message?._id);
                  }}
                  onMouseEnter={() => setIsDeleteHover(true)}
                  onMouseLeave={() => setIsDeleteHover(false)} 
                  className="p-2 rounded-full hover:bg-red-200 dark:hover:bg-gray-50"
                >
                  <IoTrashOutline className="text-black text-lg  dark:text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className={`w-full lg:w-2/3 bg-white dark:bg-gray-800 p-6 overflow-y-auto ${selectedMessage ? 'block' : 'hidden'}`}>
        {selectedMessage ? (
          <div>
            {/* Header section Main content */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-1">
              <div>
                <p className="text-lg font-bold  text-gray-900 dark:text-gray-100">
                  {selectedMessage?.firstName} {selectedMessage?.lastName}
                </p>
                <h2 className="text-md font-medium text-gray-900 dark:text-gray-100">
                  {selectedMessage?.companyName}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {selectedMessage?.email}
                </p>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <p className="text-gray-800 text-sm dark:text-gray-300">
                  {selectedMessage?.mdate}
                </p>
                <p className="text-gray-800 text-sm dark:text-gray-300">
                  {selectedMessage?.mtime}
                </p>
              </div>
            </div>

           
            <hr className="border-gray-300 dark:border-gray-600 mb-4 mt-3" />

           
            <div className="text-lg text-gray-900 dark:text-gray-100">
              {selectedMessage?.helpMessage}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-center">
            Click a message to open it
          </div>
        )}
      </div>

      {/* Mobile view or small device view */}
      <div className={`fixed pt-20 md:px-20 lg:px-0 px-2 inset-0 bg-gray-900 bg-opacity-50 lg:hidden ${selectedMessage ? 'flex' : 'hidden'} flex-col p-4`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 overflow-y-auto max-h-80">
          <p className="text-lg font-bold  text-gray-900 dark:text-gray-100">
            {selectedMessage?.firstName} {selectedMessage?.lastName}
          </p>
          <h2 className="text-md font-medium text-gray-900 dark:text-gray-100">
            {selectedMessage?.companyName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {selectedMessage?.email}
          </p>
          <div className="border-b border-gray-300 dark:border-gray-600 mb-2 mt-2"></div>
          <p className="text-lg text-gray-900 dark:text-gray-100">
            {selectedMessage?.helpMessage}
          </p>
          <button
            onClick={() => setSelectedMessage(null)}
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminInbox;
