"use client";

import { useState } from "react";

const GroupChat = ({ onConfirm, onClearSelection }) => {
  const [groupChatInput, setGroupChatInput] = useState("");
  return (
    <div className="sticy top-0 flex flex-col gap-3 bg-white p-3 shadow-sm">
      <input
        placeholder="group name"
        type="text"
        className="rounded border border-gray-300 p-2"
        value={groupChatInput}
        required
        onChange={(e) => setGroupChatInput(e.target.value)}
      />
      <div className="flex justify-center items-center gap-3  py-2">
        <button
          onClick={() => onConfirm(groupChatInput)}
          className="px-4 py-2 rounded-md bg-blue-600 text-sm cursor-pointer"
        >
          start group chat
        </button>
        <button
          onClick={onClearSelection}
          className="px-4 py-2 rounded-md bg-red-500 text-white text-sm cursor-pointer"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
