"use client"
import React, {useState} from 'react';
import DeleteConfirmationModal from "@/components/shared/CommonConfirmation/DeleteConfirmationModal";

const TestModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState('');

    const handeHabijabi = () => {
        //console.log("handeHabijabi Called on Yes");
        setIsModalOpen(false);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteClick = (itemName) => {
        setItemToDelete(itemName);
        setIsModalOpen(true);
    };



    return (
        <div>

            <button
                onClick={() => handleDeleteClick('bhai delete kortresi')}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
                Hasbijabi confim
            </button>


            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handeHabijabi}
                itemName={itemToDelete}
            />

        </div>
    );
};

export default TestModal;