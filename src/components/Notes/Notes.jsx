"use client"
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import NoteItem from "@/components/Notes/NoteItem";
import {Button} from "@/components/ui/button";
import {RiStickyNoteAddLine} from "react-icons/ri";
import Modal from "react-modal";
import "./modal.css";
import {useSession} from "next-auth/react";
import useAxiosCommon from "@/lib/axiosCommon";
import {IoCloseCircle} from "react-icons/io5";


const dummynotes = [
    {
        "id": 1,
        "title": "How to Make Maggi at Home",
        "details": "Maggi is a popular instant noodle brand that can be easily prepared at home. To make delicious Maggi, follow these steps:\n\n1. Boil 2 cups of water in a pot. You can add a pinch of salt for flavor.\n2. Add the Maggi noodles to the boiling water and let them cook for about 2 minutes, stirring occasionally to prevent sticking.\n3. In a separate pan, heat a teaspoon of oil. Add chopped onions, tomatoes, and green chilies. Sauté them until they are tender and slightly caramelized.\n4. Once the Maggi noodles are cooked, drain the water and add them to the pan with the sautéed vegetables.\n5. Mix the Maggi masala (included in the packet) into the noodles and vegetables. You can adjust the amount of masala as per your taste preference.\n6. Toss everything together and let it cook for an additional 2 minutes, allowing the flavors to meld.\n7. Your homemade Maggi is now ready to be served! You can garnish it with chopped cilantro and a squeeze of lemon juice for added freshness.\n\nEnjoy your homemade Maggi, a quick and satisfying meal that's perfect for any time of the day.",
        "date": "2023-08-15"
    },
    {
        "id": 2,
        "title": "Morning Yoga Routine",
        "details": "Starting your day with a yoga routine can set a positive tone for the rest of the day. Here's a simple 20-minute morning yoga routine to get you energized:\n\n1. Begin in a comfortable seated position, close your eyes, and take a few deep breaths to center yourself.\n2. Transition to Cat-Cow pose, moving with your breath for a few rounds.\n3. Move into Downward Facing Dog to stretch and awaken your entire body.\n4. Flow through a few rounds of Sun Salutations to warm up your muscles.\n5. Practice standing poses like Warrior I and Warrior II to build strength and focus.\n6. Move to the mat for seated poses like Seated Forward Fold and Cobbler's Pose to open up your hips and stretch your hamstrings.\n7. End with a brief meditation in Corpse Pose, focusing on your breath and setting intentions for the day.\n\nRemember, consistency is key. Practicing this routine regularly can improve your flexibility, balance, and overall well-being. Have a wonderful day!",
        "date": "2023-08-14"
    },
    {
        "id": 3,
        "title": "Book Recommendations",
        "details": "If you're an avid reader, here are three captivating books to consider adding to your reading list:\n\n1. 'The Alchemist' by Paulo Coelho: This philosophical novel follows the journey of a shepherd named Santiago as he seeks his personal legend and discovers the importance of following one's dreams.\n2. 'To Kill a Mockingbird' by Harper Lee: A classic exploration of racial injustice and moral growth, told through the eyes of young Scout Finch in the 1930s South.\n3. 'Sapiens: A Brief History of Humankind' by Yuval Noah Harari: Dive into the fascinating history of our species, from the emergence of Homo sapiens to the modern world's complex societies.\n\nThese books offer diverse perspectives, deep insights, and compelling storytelling that will keep you engaged from start to finish. Happy reading!",
        "date": "2023-08-13"
    }
]


const Notes = () => {


    const [notes, setNotes] = useState(dummynotes)

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({}); // For storing Note data to edit
    const [createNote, setCreateNote] = useState(false);


    const [showSearch, setShowSearch] = useState(false);
    const [text, setText] = useState("");
    const [filteredNotes, setFilteredNotes] = useState(notes);



    const handleSearch = () => {
        setFilteredNotes(
            notes.filter((note) => {
                if (note.title.toLowerCase().match(text.toLowerCase())) {
                    return note;
                }
            })
        );
    };

    useEffect(handleSearch, [text]);

    // Create Note
    const handleOpenCreateNote = () => {
        setCreateNote(true);
    }

    const handleCloseCreateNote = () => {
        setCreateNote(false);
    }



    // Open modal for editing Note
    const handleEdit = (Note) => {
        setFormData(Note); // Pre-fill form data with the selected Note
        setIsEditModalOpen(true);
    };

    // Close edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setFormData({});
    };

    // Handle input changes in the edit modal
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                className="flex flex-col shadow-lg w-full items-center pt-4 gap-4 rounded-xl p-4 bg-gradient-to-b from-blue-600 to-bgColor hover:shadow-lg hover:shadow-sky-200">
                <p className="text-4xl md:text-5xl font-extrabold text-white font-['Poppu']">MY Notes</p>
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
                            placeholder="search note"/>
                    </div>
                </form>
            </div>

            <button
                onClick={() => handleOpenCreateNote(true)}

                className="flex justify-center ml-2 mt-6 gap-2 align-middle bg-bgColor shadow-md dark:hover:shadow-bgColor/30 hover:bg-bgHoverColor text-white text-md hover:scale-110 duration-500 hover:shadow-lg hover:shadow-blue-200 font-medium px-4 py-2 rounded-md"
            >
                <RiStickyNoteAddLine className="self-center text-white text-lg font-extrabold"/>
                Create a Note

            </button>


            <div
                className="notes_container grid lg:grid-cols-4 md:grid-cols-3 md:mt-4 sm:grid-cols-2 xs:grid-col-1 flex-1 overflow-auto w-full gap-4 sm:mt-3 p-2 grid-cols-2">
                {filteredNotes?.length === 0 ? (
                    <p className="text-white">No Notes Found!</p>
                ) : (filteredNotes?.map((note) => (
                    <NoteItem key={note.id} note={note}/>
                )))


                }

            </div>

            {/*Create Modal*/}
            {createNote && (
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
                                    <div className="relative rounded-2xl bg-white p-6 shadow">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h2 className=" modal-title text-xl font-semibold text-gray-900">Create a new Note</h2>


                                            <button
                                                onClick={handleCloseCreateNote}
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
                                            placeholder="Note Title"
                                        />
                                        <textarea
                                            className="mb-3 font-['Poppu'] w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows="4"
                                            placeholder="Your Note..."></textarea>

                                        <button
                                            className="w-full flex justify-center mt-4 gap-2 align-middle bg-bgColor dark:hover:shadow-bgColor/30
                                 hover:bg-bgHoverColor text-white text-md hover:scale-105 duration-500 hover:shadow-lg hover:shadow-blue-200 px-4 rounded-md py-2.5 text-sm transition">Done
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </Modal>
            )}








        </div>
    );
};

export default Notes;