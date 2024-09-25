"use client"
import { useState } from 'react';

export default function AddTask({ addTask }) {
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim()) {
            addTask(newTask); // Call the passed function to handle the addition
            setNewTask(''); // Clear input
        }
    };

    return (
        <div className="mb-6 flex items-center gap-2">
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
                className="p-2 border border-gray-300 rounded-lg flex-1"
            />
            <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Add Task
            </button>
        </div>
    );
}
