import { UserButton } from "@clerk/nextjs";
import { Users } from "lucide-react";
import React from "react";

const MenuBar = () => {
  return (
    <div className="flex items-center justify-between bg-white px-3 pt-2 border-e border-e-[#DBDDE1]">
      <div>
        <UserButton />
      </div>
      <div>
        <Users className="cursor-pointer text-black" size={20} />
      </div>
    </div>
  );
};

export default MenuBar;
