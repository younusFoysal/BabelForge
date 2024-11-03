'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function AddTask({ handleAddTask }) {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const username = user?.firstName;
  const useremail = uemail;

  useEffect(() => {
    const now = new Date();

    // Convert to GMT+6
    const gmt6Offset = 6 * 60 * 60 * 1000;
    const gmt6Date = new Date(now.getTime() + gmt6Offset);

    // Format date as YYYY-MM-DD
    const year = gmt6Date.getUTCFullYear();
    const month = String(gmt6Date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(gmt6Date.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Format time as HH:MM AM/PM
    let hours = gmt6Date.getUTCHours();
    const minutes = String(gmt6Date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    // Set the formatted date and time
    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  }, []);

  const [taskName, setTaskName] = useState('');

  const handleSubmit = async () => {
    const newTask = {
      tname: taskName || 'Untitled Task',
      tdes: 'Add Description Here',
      tcomments: [],
      tassignTo: [useremail],
      tproces: 'todo',
      author: useremail,
      teamId: 'No Team',
      tdate: currentDate,
      ttime: currentTime,
    };

    await handleAddTask(newTask);
    setTaskName('');
  };

  return (
    <div className="mb-6 flex items-center gap-2">
      <input
        type="text"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        placeholder="Add new task"
        className="p-2 border border-gray-300 rounded-lg flex-1 dark:bg-transparent dark:border-gray-700"
      />
      <button
        onClick={handleSubmit}
        className=" px-6 py-3 capitalize bg-gradient-to-r from-blue-600 to-purple-600  rounded-md transition-all duration-500 text-sm  flex gap-1 items-center group  dark:bg-gray-50 text-white"
      >
        Add Task
      </button>
    </div>
  );
}
