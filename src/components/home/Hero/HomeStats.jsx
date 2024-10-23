'use client';
import React, {useState} from 'react';
import "./HomeStats.css";
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const HomeStats = () => {
    const [scrollState, setScrollState] = useState(false);
    return (
        <div className="px-24">

            <div className="outer bg-black/30 bg-blur-sm m-20">
                <div className="dot"></div>
                <div className="card">
                    <div className="ray"></div>

                    <h1 className="text text-4xl text-center lg:text-6xl my-8 dark:text-gray-300">Our Stats</h1>

                    <ScrollTrigger className="w-full pb-14" onEnter={() => setScrollState(true)}
                                   onExit={() => setScrollState(false)}>
                        <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-3 text-center items-center">
                            <div className="border-r h-full space-y-3 dark:border-gray-600">
                                <h3 className="text-xl md:text-4xl font-bold dark:text-gray-100">
                                    {scrollState && <CountUp start={0} end={1200} duration={2.5}></CountUp>}
                                </h3>
                                <p className="text-sm md:text-lg dark:text-gray-400">Product launched</p>
                            </div>
                            <div className="border-r-0 md:border-r h-full space-y-3 dark:border-gray-600">
                                <h3 className="text-xl md:text-4xl font-bold dark:text-gray-100">
                                    {scrollState && <CountUp start={0} end={1900} duration={2.5}></CountUp>}+
                                </h3>
                                <p className="text-sm md:text-lg dark:text-gray-400">Employees</p>
                            </div>
                            <div className="border-r h-full space-y-3 dark:border-gray-600">
                                <h3 className="text-xl md:text-4xl font-bold dark:text-gray-100">
                                    {scrollState && <CountUp start={0} end={150} duration={2.5}></CountUp>}+
                                </h3>
                                <p className="text-sm md:text-lg dark:text-gray-400">Countries used</p>
                            </div>
                            <div className="h-full space-y-3">
                                <h3 className="text-xl md:text-4xl font-bold dark:text-gray-100">
                                    {scrollState && <CountUp start={0} end={225} duration={2.5}></CountUp>}k+
                                </h3>
                                <p className="text-sm md:text-lg dark:text-gray-400">Customers</p>
                            </div>
                        </div>
                    </ScrollTrigger>

                    <div className="line topl dark:bg-gray-600"></div>
                    <div className="line leftl dark:bg-gray-600"></div>
                    <div className="line bottoml dark:bg-gray-600"></div>
                    <div className="line rightl dark:bg-gray-600"></div>
                </div>
            </div>
        </div>
    );
};

export default HomeStats;
