"use client"
import React, { useState } from 'react';
import Modal from "react-modal";
import "./modal.css";
import { FaPen, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosCommon from "@/lib/axiosCommon";

const NoteItem = ({ note, refetch }) => {
    const axiosCommon = useAxiosCommon();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [utitle, setuTitle] = useState("");
    const [ucategory, setuCategory] = useState("");
    const [udetails, setuDetails] = useState("");

    // Open modal for viewing Note details
    const handleView = (note) => {
        setIsModalOpen(true);
    };

    // Close view modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Open edit modal with pre-filled data
    const handleEdit = (note) => {
        setuTitle(note.title);
        setuCategory(note.category);
        setuDetails(note.details);
        setIsEditModalOpen(true);
    };

    // Close edit modal and reset form data
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setuTitle("");
        setuCategory("");
        setuDetails("");
    };

    // Delete mutation
    const { mutateAsync: deleteNoteMutation } = useMutation({
        mutationFn: async ({ id }) => {
            const { data } = await axiosCommon.delete(`/note/notes/${id}`);
            return data;
        },
        onSuccess: () => {
            refetch();
            toast.success('Note deleted successfully.');
        },
        onError: () => {
            toast.error('Failed to delete the note.');
        },
    });

    // Delete note with confirmation
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
            await deleteNoteMutation({ id });
        }
    };

    // Update mutation
    const { mutateAsync: updateNoteMutation } = useMutation({
        mutationFn: async (note) => {
            const updatedNote = { ...note };
            delete updatedNote._id; // Remove _id before patching
            const { data } = await axiosCommon.patch(`/note/notes/update/${note._id}`, updatedNote);
            return data;
        },
        onSuccess: () => {
            refetch();
            toast.success('Note updated successfully!');
        },
        onError: () => {
            toast.error('Failed to update the note.');
        },
    });

    // Submit the updated note data
    const handleSubmitEdit = async () => {
        const updatedNote = {
            _id: note._id,
            title: utitle,
            category: ucategory,
            details: udetails,
        };

        await updateNoteMutation(updatedNote);
        closeEditModal();
    };

    return (
        <>
            <div
                onClick={() => handleView(note)}
                className="w-full mr-4 pr-4 bg-blue-50/60 p-5 border border-bgColor/15 rounded-sm shadow-md hover:shadow-xl">
                <div className="flex gap-2 items-center">
                    <div className="bg-gray-800 rounded-full w-2 h-2"></div>
                    <p>{note.category}</p>
                </div>
                <h3 className="text-xl font-bold text-gray-800 py-2">
                    {note.title.length > 20 ? note.title.substr(0, 20) + "..." : note.title}
                </h3>
                <p className="border-b pb-3 border-b-gray-500">
                    {note.details.length > 100 ? note.details.substr(0, 100) + "..." : note.details}
                </p>
                <div className="flex justify-between items-center">
                    <p className="flex pt-3 items-center gap-2 w-full">
                        <span className="flex flex-row gap-2">
                            <small>{note.ndate}</small> <small>{note.ntime}</small>
                        </span>
                    </p>
                    <div className="flex gap-2">
                        <button onClick={() => handleEdit(note)} className="text-gray-500 hover:text-blue-500">
                            <FaPen />
                        </button>
                        <button onClick={() => handleDelete(note._id)} className="text-gray-500 hover:text-red-500">
                            <FaTrash />
                        </button>
                    </div>
                </div>
            </div>

            {/* View Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Note Details Modal"
                className="modal-dialog max-w-2xl"
                overlayClassName="modal-overlay"
            >
                <div className="modal-content">
                    <div className="modal-body">
                        <h2 className="modal-title text-xl font-semibold">{note.title}</h2>
                        <p>{note.details}</p>
                        <button onClick={() => handleEdit(note)} className="bg-blue-500 text-white">Edit</button>
                        <button onClick={() => handleDelete(note._id)} className="bg-red-500 text-white">Delete</button>
                    </div>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                contentLabel="Edit Note Modal"
                className="modal-dialog"
                overlayClassName="modal-overlay"
            >
                <div className="modal-content">
                    <div className="modal-body">
                        <input
                            className="w-full mb-3"
                            value={utitle}
                            onChange={(e) => setuTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <input
                            className="w-full mb-3"
                            value={ucategory}
                            onChange={(e) => setuCategory(e.target.value)}
                            placeholder="Category"
                        />
                        <textarea
                            className="w-full mb-3"
                            value={udetails}
                            onChange={(e) => setuDetails(e.target.value)}
                            placeholder="Details"
                        />
                        <button onClick={handleSubmitEdit} className="bg-blue-500 text-white">Save</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default NoteItem;
