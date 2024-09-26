import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

const MemberBox = ({ member }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="rounded-full p-1">
        <Avatar className="w-8 h-8">
          <AvatarImage
            src="https://i.ibb.co.com/zrCsVD7/github.jpg"
            className="h-8 w-8 rounded-full"
          />
        </Avatar>
      </p>
      {member}
      <p className="ml-10 group-hover:inline lg:hidden cursor-pointer">
        <BsThreeDots className="text-xl" />
      </p>
    </div>
  );
};

export default MemberBox;
