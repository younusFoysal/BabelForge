import React, { useEffect, useState } from "react";
import Button from "../../Shared/Button";
import { IoMdArrowForward } from "react-icons/io";
import HeroBox from "./HeroBox";
import {
  FaGifts,
  FaTasks,
  FaBullhorn,
  FaCapsules,
  FaBusinessTime,
} from "react-icons/fa";

const data = [
  {
    image: "./Home/hero/IT.jpg",
    title: "Design",
    icon: <FaTasks size={12} />,
  },
  {
    image: "./Home/hero/CRM.jpg",
    title: "marketing",
    icon: <FaBullhorn size={12} />,
  },

  {
    image: "./Home/hero/Operations.jpg",
    title: "Operation",
    icon: <FaCapsules size={12} />,
  },
  {
    image: "./Home/hero/Product.jpg",
    title: "Product",
    icon: <FaGifts size={12} />,
  },
  {
    image: "./Home/hero/HR.jpg",
    title: "HR",
    icon: <FaBusinessTime size={12} />,
  },
];

const HeroDown = () => {
  const [imgeSrc, setimgeSrc] = useState("./Home/hero/HR.jpg");
  const [Opacity, setOpacity] = useState(true);

  const handleChanged = (imgsrc) => {
    setimgeSrc(imgsrc);
    setOpacity(false);

    // your form submission code here
  };

  return (
    <div className="mt-14 md:flex justify-center items-center hidden">
      <div className="relative w-[60%]">
        <img
          src={imgeSrc}
          alt="hero"
          className={`w-[100%] mx-auto ${Opacity && "opacity-60"}`}
        />
        <div className="flex flex-col w-fit p-6 gap-2 bg-gradient-to-b from-white/80 to-[#F0F3FF]/30 shadow-md rounded-2xl border border-[#DCDFEC] backdrop-blur-xl absolute -top-10 -right-10 z-50">
          <h1 className="text-center pb-4">what you like to manage</h1>
          <div className="grid grid-cols-3 gap-3 ">
            {data.map((item, index) => (
              <HeroBox
                key={index}
                data={item}
                handleChanged={handleChanged}
                Icon={item.icon}
              />
            ))}
          </div>
          <div className="w-full flex justify-center items-center py-4">
            <Button text="get started" icon={<IoMdArrowForward size={20} />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDown;
