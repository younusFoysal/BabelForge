import { UserButton } from '@clerk/nextjs';
import { Users } from 'lucide-react';
import React from 'react';

const MenuBar = ({ handleUserMenuToggle }) => {
  return (
    <div className=" flex items-center justify-between bg-white px-3 p-3 border-e border-e-[#DBDDE1]   dark:bg-[#181024] dark:border-e-[#23262b]">
      <div className="text-white">
        <UserButton />
      </div>
      <div>
        <Users className="cursor-pointer text-black dark:text-white" size={20} onClick={handleUserMenuToggle} />
      </div>
    </div>
  );
};

export default MenuBar;
