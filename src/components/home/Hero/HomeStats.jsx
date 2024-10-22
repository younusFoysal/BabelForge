'use client';
import React, {useState} from 'react';
import "./HomeStats.css"
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const HomeStats = () => {
    const [scrollState, setScrollState] = useState(false);
    return (
        <div>

            <div class="outer m-20">
                <div class="dot"></div>
                <div class="card">
                    <div class="ray"></div>
                    {/*<div class="text">750k</div>*/}
                    {/*<div>Views</div>*/}
                    {/*<div className="w-full">*/}
                        <h1 className="text text-4xl text-center lg:text-6xl my-8">Our Stats</h1>
                        <ScrollTrigger className="w-full pb-14" onEnter={() => setScrollState(true)}
                                       onExit={() => setScrollState(false)}>
                            <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-3 text-center items-center">
                                <div className="border-r h-full space-y-3">
                                    <h3 className="text-xl text md:text-4xl font-bold">{scrollState &&
                                        <CountUp start={0} end={1200} duration={2.5}></CountUp>}</h3>
                                    <p className="text-sm md:text-lg">Product launched</p>
                                </div>
                                <div className="border-r-0 md:border-r h-full space-y-3">
                                    <h3 className="text-xl text md:text-4xl font-bold">{scrollState &&
                                        <CountUp start={0} end={1900} duration={2.5}></CountUp>}+</h3>
                                    <p className="text-sm md:text-lg">Employees</p>
                                </div>
                                <div className="border-r h-full space-y-3">
                                    <h3 className="text-xl text md:text-4xl font-bold">{scrollState &&
                                        <CountUp start={0} end={150} duration={2.5}></CountUp>}+</h3>
                                    <p className="text-sm md:text-lg">
                                        Countries used <br/>
                                    </p>
                                </div>

                                <div className="h-full space-y-3">
                                    <h3 className="text-xl text md:text-4xl font-bold">
                                        {scrollState && <CountUp start={0} end={225} duration={2.5}></CountUp>}
                                        k+
                                    </h3>
                                    <p className="text-sm md:text-lg">Customers</p>
                                </div>
                            </div>
                        </ScrollTrigger>

                    {/*</div>*/}


                    <div class="line topl"></div>
                    <div class="line leftl"></div>
                    <div class="line bottoml"></div>
                    <div class="line rightl"></div>
                </div>
            </div>


        </div>
    );
};

export default HomeStats;