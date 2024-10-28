import Link from "next/link";
import React from "react";

const MeetingButton = ({ text, icon, className, handleClick, userId }) => {
  return (
    <Link href={`/meet/${userId}`} target="_blank">
      <button
        onClick={handleClick}
        className={`px-6 py-3 capitalize bg-gradient-to-r from-blue-600 to-purple-600  rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group ${className} dark:bg-gray-50 text-white  `}
      >
        <span>{text}</span>
        <span className="group-hover:translate-x-2 duration-500 transition-all mt-0.5">
          {icon}
        </span>
      </button>
    </Link>
  );
};

export default MeetingButton;
