import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

const LeaderCTA = () => {
  return (
    <div className="px-4">
      <div className="max-w-[1200px] bg-black rounded-2xl px-10 lg:p-[75px] items-center mx-auto my-[90px] grid grid-cols-1 md:grid-cols-2 gap-12 border">
        <div className="pr-16">
          <img className="max-w-[200px] mb-6" src="./Home/gartner-confety_3.png" alt="" />
          <h1 className=" font-extralight text-3xl lg:text-[50px] text-white leading-[55px]">A Leader for the third year in a row!</h1>
        </div>
        <div>
          <h3 className="text-white font-light text-lg lg:text-[22px]">
            monday.com recognized as a Leader in the 2024 Magic Quadrant™ for{' '}
            <strong className=" font-bold">Adaptive Project Management and Reporting</strong>{' '}
          </h3>
          <button className="text-white flex items-center text-[14px] gap-3 mt-7 mb-4 border-b border-[#fff] pb-2">
            Get the report <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderCTA;
