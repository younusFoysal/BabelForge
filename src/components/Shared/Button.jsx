import React from "react";

const Button = ({ text, className, icon }) => {
  return (
    <button
      className={`px-6 py-3 capitalize bg-primary text-white rounded-3xl transition-all duration-500 text-sm hover:bg-[#6f6fed] flex gap-1 items-center group ${className}`}
    >
      <span>{text}</span>
      <span className="group-hover:translate-x-2 duration-500 transition-all">
        {icon}
      </span>
    </button>
  );
};

export default Button;
