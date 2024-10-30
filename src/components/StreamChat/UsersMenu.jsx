'use client';

import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useChatContext } from 'stream-chat-react';
import SingleUser from './SingleUser';
import GroupChat from './GroupChat';

const UsersMenu = ({ userData, handleUsermenubutton, handleClose, onchangeSelected }) => {
  const [users, setUsers] = useState([]);
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([]);

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
        toast.error('Failed to load users');
      }
    };
    loadusers();
  }, [client, userData.id]);

  const handleChannel = channel => {
    setActiveChannel(channel);
  };

  const sartwithUser = async userId => {
    try {
      const channel = client.channel('messaging', {
        members: [userId, userData.id],
      });
      await channel.create();
      handleChannel(channel);
    } catch (e) {
      toast.error('faild creating user');
    }
  };

  const startGroupChat = async (members, name) => {
    try {
      const channel = client.channel('messaging', {
        members,
        name,
      });
      await channel.create();
      handleChannel(channel);
    } catch (e) {
      toast.error('faild creating channel');
    }
  };

  const handleuserButton = id => {
    handleUsermenubutton();
    sartwithUser(id);
  };

  const clearselection = () => {
    setSelectedUsers([]);
  };

  return (
    <div className="absolute bg-white z-30 h-full w-full border-e border-e-[#DBDDE1] duration-300 transition-all  overflow-y-auto dark:bg-[#181024]">
      <div className="flex gap-2 items-center p-3 text-lg cursor-pointer">
        <span onClick={handleClose} className="flex gap-1 items-center">
          <ArrowLeft size={20} className="text-black dark:text-white" />
          Users
        </span>
      </div>
      {selectedUsers.length > 0 && (
        <GroupChat
          onClearSelection={clearselection}
          onConfirm={name => {
            startGroupChat([userData.id, ...selectedUsers], name);
          }}
        />
      )}
      {users?.map(user => (
        <SingleUser
          key={user.id}
          user={user}
          select={selectedUsers.includes(user.id)}
          handleuserButton={handleuserButton}
          onchangeSelected={selected =>
            setSelectedUsers(selected ? [...selectedUsers, user.id] : selectedUsers.filter(userId => userId !== user.id))
          }
        />
      ))}
    </div>
  );
};

export default UsersMenu;
