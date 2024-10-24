'use client';

import { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const AboutStatistics = () => {
  const [scrollState, setScrollState] = useState(false);

  return (
      <>
    <div className=" bg-white dark:bg-white/10 border-[#ffffff22] backdrop-blur-lg  border-[1px] w-[90%] mx-auto text-gray-800  dark:text-white px-2 md:px-5 py-10 my-10 mb-20  rounded-xl space-y-16">
      <h1 className="text-4xl md:text-7xl font-bold text-center">BabelForge.com By The Numbers</h1>
      <ScrollTrigger onEnter={() => setScrollState(true)} onExit={() => setScrollState(false)}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center items-center">
          <div className="border-r dark:border-gray-500 h-full space-y-3">
            <h3 className="text-xl md:text-4xl font-bold">{scrollState && <CountUp start={0} end={1200} duration={2.5}></CountUp>}</h3>
            <p className="text-sm md:text-lg">Product launched</p>
          </div>
          <div className="border-r-0 dark:border-gray-500 md:border-r h-full space-y-3">
            <h3 className="text-xl md:text-4xl font-bold">{scrollState && <CountUp start={0} end={1900} duration={2.5}></CountUp>}+</h3>
            <p className="text-sm md:text-lg">employees</p>
          </div>
          <div className="border-r dark:border-gray-500 h-full space-y-3">
            <h3 className="text-xl md:text-4xl font-bold">{scrollState && <CountUp start={0} end={150} duration={2.5}></CountUp>}+</h3>
            <p className="text-sm md:text-lg">
              countries use <br /> BabelForge.com
            </p>
          </div>

          <div className="h-full space-y-3">
            <h3 className="text-xl md:text-4xl font-bold">
              {scrollState && <CountUp start={0} end={225} duration={2.5}></CountUp>}
              k+
            </h3>
            <p className="text-sm md:text-lg">customers use Bableforge.com to manage their work</p>
          </div>
        </div>
      </ScrollTrigger>
    </div>
      </>
  );
};

export default AboutStatistics;
