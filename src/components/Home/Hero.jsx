import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import Button from "../Shared/Button";

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
          <Button text="get started" icon={<IoMdArrowForward size={20} />} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
