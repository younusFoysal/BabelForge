import React from "react";
import { IoMdArrowForward } from "react-icons/io";

const Hero = () => {
  return (
    <section className="container max-w-screen-2xl mx-auto px-4 bg-[#F0F3FF] rounded-t-3xl">
      <div
        className="h-screen flex justify-center items-center
      "
      >
        <div className="w-[90%] md:w-[40%] flex flex-col justify-center items-center text-center">
          <h1 className=" text-4xl md:text-5xl md:leading-[65px] leading-[50px]">
            Made for work, designed to love
          </h1>
          <p className="py-4">
            The platform that gives you the flexibility to run any aspect of by
            work.
          </p>
          <button className="px-6 py-3 capitalize bg-primary text-white rounded-3xl text-sm flex gap-1 items-center">
            <span>get started</span>
            <IoMdArrowForward size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
