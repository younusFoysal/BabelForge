"use client"

import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import { MdOutlineMessage } from "react-icons/md";

import { TbStar } from "react-icons/tb";
import Swal from "sweetalert2";

const AdminInbox = () => {

    const [selectedMessage, setSelectedMessage] = useState(null);
    const axiosCommon = useAxiosCommon();

    // get All messages
    const { data: messages = [], refetch } = useQuery({
        queryKey: ['admin-inbox'],
        queryFn: async () => {
            const res = await axiosCommon.get('/message/messages');
            return res.data;
        }
    })

    console.log(messages);




    // open mail
    const openMail = (message) => {
        setSelectedMessage(message);
    };

    // back to inbox
    const goBackToInbox = () => {
        setSelectedMessage(null);
    };

    // handle delete 
    const handleDelete = (id) => {
        console.log(id);
        // console.log(item);
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7066e3",
            cancelButtonColor: "#707a83",
            confirmButtonText: "Yes, delete it!"
        })


            .then(async (result) => {
                if (result.isConfirmed) {
                    // 
                    const res = await axiosCommon.delete(`/message/messages/${id}`);
                    // console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: `Message has been deleted`,
                            icon: "success"
                        });


                        // refetch for delete from ui instantly
                        refetch();

                    }
                }

            })
    }

    return (
        <div>
            {/* container */}
             <div className="flex flex-col md:flex-row h-screen bg-gray-100">
       
            <div className="flex-1 p-6 overflow-auto">
                <h1 className="text-2xl font-bold mb-4">All Message Inbox</h1>

                {/* Message details */}
                {selectedMessage ? (
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <button
                            className="text-blue-500 mb-4"
                            onClick={goBackToInbox}
                        >
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
                    <div className="bg-white rounded-lg shadow-md">
                        {/* messages show in table*/}
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <tbody>
                                    {messages.map((message) => (
                                        <tr
                                            key={message.id}
                                            className="hover:bg-gray-100 cursor-pointer border-b "
                                            onClick={() => openMail(message)}
                                        >
                                            <td className="px-4 py-2 flex items-center">
                                                <span className='text-xl mr-3'><TbStar /></span>
                                                <MdOutlineMessage className="h-6 w-6 text-blue-500 mr-2" />
                                                <span className="mr-1">{message.firstName} </span>
                                                {message.lastName}
                                            </td>
                                            <td className="px-4 py-2 truncate w-1/2 max-w-[200px] text-left">
                                                {message.helpMessage}
                                            </td>
                                            <td className="px-4 py-2 text-right">{message.mtime}</td>
                                            <td className="px-4  text-right ">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        handleDelete(message._id);
                                                    }}
                                                    className="p-2 rounded-full text-xl hover:bg-gray-300 transition duration-200"
                                                >
                                                    <FaRegTrashAlt />
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