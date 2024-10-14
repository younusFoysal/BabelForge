'use client';
import { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import './AboutStatics.css';

const AboutStatistics = () => {
  const [scrollState, setScrollState] = useState(false);
  // bg-[#ffffff1e]backdrop-blur-[300px]
  return (
    <div className="w-[90%] relative h-auto mx-auto dark:border-[#ffffff1a]  border-[#7777772f]  border-[1px] text-[#333] dark:text-white px-2 md:px-5 py-10 my-10 mb-20 rounded-xl">
      <div className="animated-border-box-glow"></div>
      <div className="animated-border-boxs ">
        <h1 className="text-4xl md:text-7xl mb-12 font-bold text-center">babelforge.com by the numbers</h1>
        <ScrollTrigger onEnter={() => setScrollState(true)} onExit={() => setScrollState(false)}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center items-center">
            <div className="border-r h-full space-y-3">
              <h3 className="text-xl md:text-4xl font-bold">{scrollState && <CountUp start={0} end={1200} duration={2.5}></CountUp>}</h3>
              <p className="text-sm md:text-lg">Product launched</p>
            </div>
            <div className="border-r-0 md:border-r h-full space-y-3">
              <h3 className="text-xl md:text-4xl font-bold">{scrollState && <CountUp start={0} end={1900} duration={2.5}></CountUp>}+</h3>
              <p className="text-sm md:text-lg">employees</p>
            </div>
            <div className="border-r h-full space-y-3">
              <h3 className="text-xl md:text-4xl font-bold">{scrollState && <CountUp start={0} end={150} duration={2.5}></CountUp>}+</h3>
              <p className="text-sm md:text-lg">
                countries use <br /> babelforge.com
              </p>
            </div>

            <div className="h-full space-y-3">
              <h3 className="text-xl md:text-4xl font-bold">
                {scrollState && <CountUp start={0} end={225} duration={2.5}></CountUp>}
                k+
              </h3>
              <p className="text-sm md:text-lg">customers use bableforge.com to manage their work</p>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </div>
  );
};

export default AboutStatistics;
