"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useChatContext } from "stream-chat-react";

const UsersMenu = ({ userData, handleUsermenubutton, handleClose }) => {
  const [users, setUsers] = useState([]);
  const { client } = useChatContext();

  useEffect(() => {
    const loadusers = async () => {
      try {
        const res = await client.queryUsers(
          { id: { $ne: userData.id } },
          {
            id: 1,
          }
        );
        setUsers(res.users);
      } catch (e) {
        toast.error("Failed to load users");
      }
    };
    loadusers();
  }, [client, userData.id]);

  return (
    <div className="absolute bg-white z-30 h-full w-full border-e border-e-[#DBDDE1] duration-300 transition-all  overflow-y-auto  ">
      <div
        className="flex gap-2 items-center p-3 text-lg cursor-pointer"
        onClick={handleClose}
      >
        <ArrowLeft size={20} className="text-black" /> users
      </div>
      {users?.map((user) => (
        <button
          className="flex items-center px-3 mb-4 w-full gap-2 animate-pulse"
          key={user.id}
          onClick={handleUsermenubutton}
        >
          <img
            src={user?.image}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {user?.name} || {user?.id}
          </p>
          {user?.online && (
            <span className="text-xs text-green-600">online</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default UsersMenu;
