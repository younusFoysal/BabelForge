'use client';

import { useState } from 'react';

const GroupChat = ({ onConfirm, onClearSelection }) => {
  const [groupChatInput, setGroupChatInput] = useState('');
  return (
    <div className="sticy top-0 flex flex-col gap-3 dark:bg-[#17191c] bg-white p-3 shadow-sm">
      <input
        placeholder="group name"
        type="text"
        className="rounded border border-gray-300 p-2"
        value={groupChatInput}
        required
        onChange={e => setGroupChatInput(e.target.value)}
      />
      <div className="flex justify-center items-center gap-6  py-2">
        <button
          onClick={() => onConfirm(groupChatInput)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md transition-all duration-500 hover:shadow-lg text-white text-sm cursor-pointer"
        >
          Start Group Chat
        </button>
        <button
          onClick={onClearSelection}
          className="px-4 py-2 rounded-md border bg-gradient-to-r from-red-600 to-red-700 text-white transition-all duration-500 hover:shadow-lg text-sm cursor-pointer"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
