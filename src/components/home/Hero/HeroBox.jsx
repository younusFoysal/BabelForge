"use client";
import { useEffect, useState } from "react";

const HeroBox = ({ data, handleChanged }) => {
  const [selected, setselected] = useState(false);
  const { icon, title, image } = data;

  const handleClick = () => {
    handleChanged(image);
    setselected(!selected);
  };

  // This will log the updated state
  useEffect(() => {}, [selected]);

  return (
    <div
      onClick={handleClick}
      className="rounded-lg bg-[#ffffff] dark:bg-[#af64d8] p-3 py-5 border border-gray-200 flex flex-col items-center group relative"
    >
      <input
        type="checkbox"
        className="border border-gray-200 absolute top-2 left-2 rounded-lg bor"
        checked={selected} // lowercase 'checked'
      />
      <div
        className={`group-hover:text-primary transition-all duration-300 pt-2 ${
          selected ? "text-primary" : ""
        }`}
      >
        {icon}
      </div>
      <p className="text-xs mt-2 capitalize">{title}</p>
    </div>
  );
};

export default HeroBox;
