import { UserButton } from "@clerk/nextjs";
import { Users } from "lucide-react";
import React from "react";

const MenuBar = () => {
  return (
    <div className="flex items-center justify-between bg-white px-3 p-3 border-e border-e-[#DBDDE1] dark:bg-black">
      <div>
        <UserButton />
      </div>
      <div>
        <Users
          className="cursor-pointer text-black dark:text-white"
          size={20}
        />
      </div>
    </div>
  );
};

export default MenuBar;
