import { useState } from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800">Delete {itemName}?</h2>
                <p className="text-gray-600 mt-2">
                    Are you sure you want to delete this {itemName}? This action cannot be undone.
                </p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
