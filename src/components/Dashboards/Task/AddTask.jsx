"use client";
import { useState } from "react";

export default function AddTask({ handleAddTask }) {
    const [taskName, setTaskName] = useState("");

    const handleSubmit = async () => {
        const newTask = {
            tname: taskName || "Untitled Task",
            tdes: "This is a description",
            tcomments: [
                { user_ID: "comment1", datetime: "10/12/24" },
                { user_ID: "comment2", datetime: "11/12/24" }
            ],
            tassignTo: "user_ID",
            tproces: "inProgress",
            author: "Foysal",
            teamId: "team_ID",
            tdate: "07/12/24",
            ttime: "17/12/24"
        };

        await handleAddTask(newTask);
        setTaskName(""); // Clear input after submitting
    };

    return (
        <div className="mb-6 flex items-center gap-2">
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Add new task"
                className="p-2 border border-gray-300 rounded-lg flex-1 dark:bg-transparent"
            />
            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Add Task
            </button>
        </div>
    );
}
