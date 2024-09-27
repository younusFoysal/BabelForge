import { BadgeCheck } from "lucide-react";
import React from "react";

const PricingSingleCard = () => {
  return (
    <div
      className="flex w-full mb-8  sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 dark:text-white"
      data-aos="fade-down"
    >
      <div className="flex flex-grow flex-col p-6 sm:p-8  border-gray-800 border-[1px] rounded-3xl hover:shadow-2xl duration-500">
        <div className="space-y-2">
          <h4 className="text-2xl font-bold">Basic</h4>
          <p className="pt-4 ">
            <span className="text-6xl font-extralight">
              $<span className="font-bold">0</span>
              <span className="text-sm font-normal pl-1">/Free Forever</span>
            </span>
          </p>
        </div>

        <p className="mt-4 leading-relaxed text-gray-600 font-semibold dark:text-white">
          Free for your whole team
        </p>

        <button
          type="button"
          className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded-full bg-primary hover:bg-primary-dark text-gray-50 mb-10 mt-16 dark:text-black"
        >
          Try for Free
        </button>

        <p>For individuals looking to keep track of their work</p>

        <span className="border-b-2 pt-6 "></span>

        <h4 className="text-xl font-semibold my-4">Free includes:</h4>

        <ul className="flex-1 mb-6 mt-4 text-gray-600 space-y-6 dark:text-white">
          <li className="flex mb-2 space-x-2">
            <span className="text-green-600  text-lg">
              <BadgeCheck size={20} className="mt-[2px]" />
            </span>

            <span>Up to 3 boards</span>
          </li>

          <li className="flex mb-2 space-x-2">
            <span className="text-green-600  text-lg">
              <BadgeCheck size={20} className="mt-[2px]" />
            </span>

            <span>Unlimited docs</span>
          </li>

          <li className="flex mb-2 space-x-2">
            <span className="text-green-600  text-lg">
              <BadgeCheck size={20} className="mt-[2px]" />
            </span>
            <span>200+ templates</span>
          </li>
          <li className="flex mb-2 space-x-2">
            <span className="text-green-600  text-lg">
              <BadgeCheck size={20} className="mt-[2px]" />
            </span>
            <span>8 column types</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PricingSingleCard;
