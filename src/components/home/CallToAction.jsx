import React from "react";

import Button from "../shared/Buttons";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import call from "@/image/Home/call.png";

const CallToAction = () => {
  return (
    <div className="bg-[#1f0f83] flex flex-col md:flex-row items-center justify-between gap-10 p-12 leading-relaxed">
      <div className="w-full md:w-3/5">
        <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-extralight text-center md:text-start">
          Deliver your best work with{" "}
          <span className="text-gray-300">babelforge.com</span>
        </h1>
        <div className="w-full flex justify-center md:justify-start">
          <Button
            text="Get Started"
            className={"mt-5"}
            icon={<ArrowRight size={20} />}
          />
        </div>
      </div>
      <Image
        height={400}
        width={600}
        className="w-full md:w-2/5"
        src={call}
        alt="Call to Action"
      />
    </div>
  );
};

export default CallToAction;
