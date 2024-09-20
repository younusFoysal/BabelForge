import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import Button from "../Shared/Button";
import HeroDown from "./Hero/HeroDown";

const Hero = () => {
  return (
    <section className="container max-w-screen-2xl mx-auto px-4 mb-16 bg-[#F0F3FF] rounded-3xl">
      <div className="flex items-center flex-col">
        <div className="w-[90%] md:w-[40%] flex flex-col justify-center items-center text-center pt-14">
          <h1 className="text-4xl md:text-5xl md:leading-[65px] leading-[50px]">
            Made for work, designed to love
          </h1>
          <p className="pt-4 pb-7">
            The platform that gives you the flexibility to run any aspect of by
            work.
          </p>
          <Button text="get started" icon={<IoMdArrowForward size={20} />} />
          <p className="py-4">
            No credit card needed ✦ Unlimited time on Free plan
          </p>
        </div>
      </div>
      <HeroDown />
    </section>
  );
};

export default Hero;
