"use client"
import React, {useState} from 'react';
import DeleteConfirmationModal from "@/components/shared/CommonConfirmation/DeleteConfirmationModal";

const ConUseModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState('');

    const handleDeleteClick = (itemName) => {
        setItemToDelete(itemName);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        // Logic to delete the item
        //console.log(`Deleted ${itemToDelete}`);
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            <div>
                <button
                    onClick={() => handleDeleteClick('Item 1')}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Delete Item 1
                </button>

                <DeleteConfirmationModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                    itemName={itemToDelete}
                />
            </div>

        </div>
    );
};

export default ConUseModal;