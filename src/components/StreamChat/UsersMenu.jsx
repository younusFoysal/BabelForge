"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useChatContext } from "stream-chat-react";
import SingleUser from "./SingleUser";

const UsersMenu = ({
  userData,
  handleUsermenubutton,
  handleClose,
  onchangeSelected,
}) => {
  const [users, setUsers] = useState([]);
  const { client, setActiveChannel } = useChatContext();
  const { selected, setselectUser } = useState([]);

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

  const handleChannel = (channel) => {
    setActiveChannel(channel);
  };

  const sartwithUser = async (userId) => {
    try {
      const channel = client.channel("messaging", {
        members: [userId, userData.id],
      });
      await channel.create();
      handleChannel(channel);
    } catch (e) {
      toast.error("faild creating user");
    }
  };

  const handleuserButton = (id) => {
    handleUsermenubutton();
    sartwithUser(id);
  };

  return (
    <div className="absolute bg-white z-30 h-full w-full border-e border-e-[#DBDDE1] duration-300 transition-all  overflow-y-auto  dark:bg-gray-900">
      <div className="flex gap-2 items-center p-3 text-lg cursor-pointer">
        <span onClick={handleClose} className="flex gap-1 items-center">
          <ArrowLeft size={20} className="text-black" />
          users
        </span>
      </div>
      {users?.map((user) => (
        <SingleUser
          key={user.id}
          user={user}
          selectUser={selected.includes(user.id)}
          handleuserButton={handleuserButton}
          onchangeSelected={onchangeSelected}
        />
      ))}
    </div>
  );
};

export default UsersMenu;
