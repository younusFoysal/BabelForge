"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useChatContext } from "stream-chat-react";

const UsersMenu = ({ userData }) => {
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

  console.log(users);

  return (
    <div className="bg-white absolute z-20 h-full w-full border-e border-e-[#DBDDE1] duration-300 transition-all hover:bg-gray-100">
      {users?.map((user) => (
        <button
          className="flex items-center px-3 mb-4 w-full gap-2"
          key={user.id}
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
