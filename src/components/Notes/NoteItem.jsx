import React, {useState} from 'react';
import Modal from "react-modal";
import "./modal.css";
import {FaPen, FaRegEdit, FaTrash} from "react-icons/fa";
import {MdDeleteOutline} from "react-icons/md";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosCommon from "@/lib/axiosCommon";

const NoteItem = ({ note }) => {

    const axiosCommon = useAxiosCommon();
    const [loading, setLoading] = useState(false);

    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({}); // For storing Note data to edit



    // Open modal for viewing Note details
    const handleView = (Note) => {
        setSelectedNote(Note);
        setIsModalOpen(true);
    };

    // Close detail modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
    };


    // Open modal for editing Note
    const handleEdit = (Note) => {
        console.log("Edit called")
        setIsModalOpen(false);
        //setFormData(Note); // Pre-fill form data with the selected Note
        setIsEditModalOpen(true);

    };

    // Close edit modal
    const closeEditModal = () => {

        setIsEditModalOpen(false);
        setFormData({});
    };

    // Delete handle
    const { mutateAsync: deleteTaskMutation, isLoading: isDeleting } = useMutation({
        mutationFn: async ({ id }) => {
            const { data } = await axiosCommon.delete(`/task/tasks/delete/${id}`);
            return data;
        },
        onSuccess: () => {
            refetch();
            toast.success('Task deleted successfully.');
        },
        onError: () => {
            toast.error('Failed to delete the task.');
        },
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                await deleteTaskMutation({ id });
            } catch (err) {
                console.error(err);
            }
        }
    };

    // Handle input changes in the edit modal
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const { mutateAsync: updateTaskMutation } = useMutation({
        mutationFn: async (task) => {
            const taskWithoutID = { ...task };
            delete taskWithoutID._id; // Remove the _id field before patching
            const { data } = await axiosCommon.patch(`/task/tasks/update/${task._id}`, taskWithoutID);
            return data;
        },
        onSuccess: () => {
            toast.success('Task updated successfully!');
            refetch(); // Refetch task data after update
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const handleEditTask = async (updatedTask) => {
        try {
            await updateTaskMutation(updatedTask);
        } catch (err) {
            console.error(err);
        }
    };

    // Handle form submit to update Note
    const handleSubmitEdit = async () => {
        try {
            await handleEditNote(formData);
            closeEditModal();
        } catch (err) {
            console.error(err);
        }
    };





    return (
        <div>
            <div
                onClick={() => handleView(note)}
                className="note font-['Poppu'] lg:p-4 md:p-4 sm:p-2 p-1 rounded-md flex flex-col justify-between items-start border-[1px] border-bgColor border-solid h-[150px]"
            >
                <h4 className="text-black lg:text-xl md:text-lg sm:text-sm text-xs">
                    {note.title.length > 20 ? note.title.substr(0, 20) + "..." : note.title}
                </h4>
                <p className="text-sm text-gray-500">{note.description}
                    {note.details.length > 100 ? note.details.substr(0, 100) + "..." : note.details}
                </p>
                <p className="text-gray-500 lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px]">{note.date}</p>
            </div>


            {/*View Modal*/}
            {isModalOpen === true ? (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Task Details Modal"
                    className="modal-dialog max-w-2xl"
                    overlayClassName="modal-overlay"
                >
                    <div className="modal-content">
                        <div className="modal-body">

                            <div className="flex items-center justify-center p-4">
                                <div className="w-full max-w-full">
                                    <div className="relative rounded-2xl bg-white p-6 shadow">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h2 className=" modal-title text-xl font-semibold text-gray-900">{note.title}</h2>


                                            <button
                                                onClick={closeModal}
                                                className="close right-5 top-5 text-gray-400 hover:text-gray-600">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>

                                        <p
                                            className="mb-2 font-['Poppu'] w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows="4"
                                            placeholder="Your Note..."> {note.details}</p>

                                        <div className="flex gap-2 justify-between items-center">

                                            <button
                                                onClick={() => handleEdit(note)}
                                                className="w-full flex justify-center items-center mt-4 gap-2 align-middle bg-bgColor dark:hover:shadow-bgColor/30
                                 hover:bg-bgHoverColor text-white text-md hover:scale-105 duration-500 hover:shadow-lg hover:shadow-blue-200 px-4 rounded-md py-2.5 text-sm transition">
                                                <FaPen />
                                                Update
                                            </button>

                                            <button
                                                className="w-full flex justify-center items-center mt-4 gap-2 align-middle bg-red-600 dark:hover:shadow-red-500/30
                                 hover:bg-red-800 text-white text-md hover:scale-105 duration-500 hover:shadow-lg hover:shadow-red-300 px-4 rounded-md py-2.5 text-sm transition">
                                                <FaTrash  />
                                                Delete
                                            </button>

                                        </div>


                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </Modal>
                )
                :
                ""
            }

            {/*Create Modal*/}
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
                                    <div className="relative rounded-2xl bg-white p-6 shadow">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h2 className=" modal-title text-xl font-semibold text-gray-900">Update the Note</h2>


                                            <button
                                                onClick={closeEditModal}
                                                className="close right-5 top-5 text-gray-400 hover:text-gray-600">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>

                                        <input
                                            className="mb-3 font-['Poppu'] w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            defaultValue={note.title}
                                        />
                                        <textarea
                                            className="mb-3 font-['Poppu'] w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows="4"
                                            defaultValue={note.details}
                                            placeholder="Your Note..."></textarea>

                                        <button
                                            onClick={handleSubmitEdit}
                                            className="w-full flex justify-center mt-4 gap-2 align-middle bg-bgColor dark:hover:shadow-bgColor/30
                                 hover:bg-bgHoverColor text-white text-md hover:scale-105 duration-500 hover:shadow-lg hover:shadow-blue-200 px-4 rounded-md py-2.5 text-sm transition">
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </Modal>
            ) : ""}



        </div>
    );
};

export default NoteItem;