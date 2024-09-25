"use client";

import HR from "@/image//Home/hero/HR.jpg";
import desing from "@/image//Home/hero/IT.jpg";
import Operations from "@/image//Home/hero/Operations.jpg";
import Product from "@/image//Home/hero/Product.jpg";
import marketing from "@/image/Home/hero/CRM.jpg";
import {
  ArrowRight,
  ClipboardList,
  FileTerminal,
  Network,
  PackageOpen,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Button from "../../shared/Buttons";
import HeroBox from "./HeroBox";

const data = [
  {
    image: desing,
    title: "Design",
    icon: <ClipboardList size={12} />,
  },
  {
    image: marketing,
    title: "marketing",
    icon: <Network size={12} />,
  },

  {
    image: Operations,
    title: "Operation",
    icon: <Stethoscope size={12} />,
  },
  {
    image: Product,
    title: "Product",
    icon: <PackageOpen size={12} />,
  },
  {
    image: HR,
    title: "HR",
    icon: <FileTerminal size={12} />,
  },
];

const HeroDown = () => {
  const [imgeSrc, setimgeSrc] = useState(desing);
  const [Opacity, setOpacity] = useState(true);

  const handleChanged = (imgsrc) => {
    setimgeSrc(imgsrc);
    setOpacity(false);
    // your form submission code here
  };

  return (
    <div className="mt-14 md:flex justify-center items-center hidden">
      <div className="relative w-[60%]">
        <Image
          loading="lazy"
          width={800}
          height={700}
          src={imgeSrc}
          alt="hero"
          className={`w-[100%] mx-auto rounded-lg ${Opacity && "opacity-60"}`}
        />
        <div className="flex flex-col w-fit p-6 gap-2 bg-gradient-to-b from-white/80 dark:bg-[#7A1CAC] to-[#AD49E1]/30 shadow-md rounded-2xl border border-[#DCDFEC] backdrop-blur-xl absolute -top-10 -right-10 z-50">
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
            <Button text="get started" icon={<ArrowRight size={20} />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDown;
