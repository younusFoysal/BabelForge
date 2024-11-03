'use client';
import { useState } from 'react';
import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';
import { IoTrashOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { HiMiniClipboardDocumentList } from 'react-icons/hi2';
import Image from 'next/image';
import inbox from '@/image/inbox/message-inbox.png';
import userIcon from '@/image/inbox/user.png';
import './AdminInbox.css';
import useRole from '@/hooks/useRole';
import { redirect } from 'next/navigation';
import Alert from '@/components/shared/Alert';
import { toast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

const AdminInbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [role, roleLoading] = useRole();

  const axiosCommon = useAxiosCommon();

  const {
    data: messages = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['admin-inbox'],
    queryFn: async () => {
      const res = await axiosCommon.get('/message/messages');
      return res.data;
    },
  });

  // Handle delete
  const handleDelete = async id => {
    const res = await axiosCommon.delete(`/message/messages/${id}`);
    if (res.data.deletedCount > 0) {
      toast({
        description: 'Message Deleted',
      });
      setSelectedMessage(null);
      refetch();
    }
  };

  // Open the selected mail
  const openMail = message => {
    setSelectedMessage(message);
  };

  if (roleLoading || isLoading) return <LoadingSpinner />;

  if (role !== 'admin') redirect('/');

  return (
    <div className="h-screen  flex flex-col lg:flex-row rounded-3xl bg-blue-100 dark:bg-[#181024] gray-900">
      {/* Sidebar containing messages */}
      <div className="w-full  lg:w-1/3  rounded-3xl dark:bg-[#181024] gray-800 p-4 overflow-y-auto custom-scrollbar">
        <div className="bg-white rounded-3xl dark:bg-[#181024] border dark:border-[#3e1878c2]  gray-700">
          <div>
            {messages?.map((message, index) => (
              <div
                key={message?._id}
                onClick={() => openMail(message)}
                className={`cursor-pointer border-b-[1px] hover:border-b-4 hover:border-[#3e1878c2]  p-4 shadow-sm hover:bg-slate-200 dark:hover:bg-[#200e3be2] transition-all flex flex-col justify-between h-full relative ${
                  index === 0 ? 'rounded-t-3xl' : index === messages.length - 1 ? 'rounded-b-3xl' : ''
                }`}
              >
                <div className="flex gap-3">
                  <Image alt="" className="w-12 h-12 rounded-full  dark:bg-[#181024] gray-500  " src={userIcon} width={400} height={400} />
                  <div className="w-full">
                    <div>
                      <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[calc(100%-70px)]  ">
                        {message?.firstName} {message?.lastName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-normal line-clamp-2 mt-3">
                        {message?.helpMessage}
                      </p>
                    </div>
                    <div className="absolute top-5 right-4">
                      <p className="text-sm text-gray-400 dark:text-gray-400">{message?.mtime}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="overflow-hidden w-full lg:w-2/3 bg-blue-100 lg:block hidden dark:bg-[#181024] gray-800">
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
                <div className="grid grid-cols-2 px-4 py-2">
                  <h3 className="text-base capitalize flex items-center gap-[4px]">
                    <span>
                      <HiOutlineOfficeBuilding />
                    </span>
                    {selectedMessage?.companyName}
                  </h3>
                  <p>
                    <span className="py-1 capitalize px-2 flex items-center gap-[4px] font-medium text-red-400 dark:text-blue-300 dark:bg-[#181024] transparent min-w-10 rounded-sm">
                      <span className="text-xl">
                        <HiMiniClipboardDocumentList />
                      </span>
                      {selectedMessage?.jobTitle}
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-white border dark:border-[#3e1878c2] dark:bg-[#181024] gray-700 p-6 rounded-3xl lg:h-96 pb-10 relative">
                <div className="flex flex-col md:flex-row justify-between items-start mb-1">
                  <div className="flex gap-3">
                    <Image alt="" className="w-10 h-10 rounded-full  dark:bg-[#181024] gray-500  " src={userIcon} width="" height="" />
                    <div>
                      <p className="text-base font-bold text-gray-900 dark:text-gray-100">
                        {selectedMessage?.firstName} {selectedMessage?.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedMessage?.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-8">
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-gray-800 text-sm dark:text-gray-300">{selectedMessage?.mtime}</p>
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

                <div className="text-lg text-gray-900 dark:text-gray-100">{selectedMessage?.helpMessage}</div>

                <p className="absolute bottom-4 right-4 text-gray-800 text-sm dark:text-gray-300">{selectedMessage?.mdate}</p>
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
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {selectedMessage?.firstName} {selectedMessage?.lastName}
          </p>
          <h2 className="text-md font-medium capitalize text-gray-900 dark:text-gray-100">{selectedMessage?.companyName}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{selectedMessage?.email}</p>
          <div className="border-b border-gray-300 dark:border-gray-600 mb-2 mt-2"></div>
          <p className="text-lg text-gray-900 dark:text-gray-100">{selectedMessage?.helpMessage}</p>
          <button onClick={() => setSelectedMessage(null)} className="mt-4 px-4 py-2 bg-gray-700 text-white rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminInbox;
