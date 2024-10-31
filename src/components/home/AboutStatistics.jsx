'use client';

import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const AboutStatistics = () => {
  const [scrollState, setScrollState] = useState(false);
  const axiosCommon = useAxiosCommon();

  const { isLoading, data: stats } = useQuery({
    queryKey: ["home-statistics"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`admin/dashboard`);
      return data;
    },
  });

  return (
    <>
      <div className=" bg-white dark:bg-white/10 border-[#ffffff22] backdrop-blur-lg  border-[1px] w-[90%] mx-auto text-gray-800  dark:text-white px-2 md:px-5 py-10 my-10 mb-20  rounded-xl space-y-16">
        <h1 className="text-2xl px-4 md:text-7xl font-bold text-center">BabelForge.com By The Numbers</h1>
        <ScrollTrigger onEnter={() => setScrollState(true)} onExit={() => setScrollState(false)}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center items-center">
            <div className="border-r dark:border-gray-500 h-full space-y-3">
              <h3 className="text-xl md:text-4xl font-bold">{scrollState && <CountUp start={0} end={stats?.plen} duration={3}></CountUp>}</h3>
              <p className="text-sm md:text-lg">Total projects created.</p>
            </div>
            <div className="border-r-0 dark:border-gray-500 md:border-r h-full space-y-3">
              <h3 className="text-xl md:text-4xl font-bold">{scrollState && <CountUp start={0} end={stats?.tmlen} duration={3}></CountUp>}+</h3>
              <p className="text-sm md:text-lg">Total teams under all projects.</p>
            </div>
            <div className="border-r dark:border-gray-500 h-full space-y-3">
              <h3 className="text-xl md:text-4xl font-bold">{scrollState && <CountUp start={0} end={stats?.tslen} duration={3}></CountUp>}+</h3>
              <p className="text-sm md:text-lg">
                Total assigned tasks.
              </p>
            </div>

            <div className="h-full space-y-3">
              <h3 className="text-xl md:text-4xl font-bold">
                {scrollState && <CountUp start={0} end={stats?.ulen} duration={3}></CountUp>}+
              </h3>
              <p className="text-sm md:text-lg">Customers use bableforge.com</p>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </>
  );
};

export default AboutStatistics;
