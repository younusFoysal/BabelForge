import React from 'react';
import {RiNumber1, RiNumber2, RiNumber3, RiNumber4} from "react-icons/ri";

const RoadMap = () => {
    return (
        <div>
            <section className="bg-white/80 dark:bg-white/5 backdrop-blur-lg border-white/15 border-[1px] max-w-[1200px] rounded-2xl mx-auto py-12 sm:py-16 lg:py-20 xl:py-24 duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-widest dark:text-white">How It Works</p>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            Start Managing In 4 Easy Steps
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg font-normal text-gray-700 dark:text-white lg:text-xl lg:leading-8">
                            Create your own project with us and manage it with just 4 easy steps
                        </p>
                    </div>
                    <ul className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-10 sm:mt-16 lg:mt-20 lg:max-w-5xl lg:grid-cols-4">
                        <li className="flex-start group relative flex lg:flex-col">

                        <span className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                            aria-hidden="true"></span>

                            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-purple-700 group-hover:bg-purple-700">
                                <RiNumber1 className="h-5 w-5 text-gray-600 group-hover:text-white" />
                            </div>

                            <div className="ml-6 lg:ml-0 lg:mt-10">
                                <h3 className="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 dark:text-white">
                                    Create Project
                                </h3>
                                <h4 className="mt-2 text-base text-gray-700 dark:text-gray-200">Set up your own project for administration.</h4>
                            </div>

                        </li>

                        <li className="flex-start group relative flex lg:flex-col">

                            <span className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                                aria-hidden="true"></span>

                            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-purple-700 group-hover:bg-purple-700">
                                <RiNumber2 className="h-5 w-5 text-gray-600 group-hover:text-white" />
                            </div>

                            <div className="ml-6 lg:ml-0 lg:mt-10">
                                <h3 className="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 dark:text-white">
                                    Create Teams
                                </h3>
                                <h4 className="mt-2 text-base text-gray-700 dark:text-gray-200">Form teams for different domains.</h4>
                            </div>

                        </li>

                        <li className="flex-start group relative flex lg:flex-col">
                            <span
                                className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                                aria-hidden="true"></span>
                            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-purple-700 group-hover:bg-purple-700">
                                <RiNumber3 className="h-5 w-5 text-gray-600 group-hover:text-white" />
                            </div>
                            <div className="ml-6 lg:ml-0 lg:mt-10">
                                <h3 className="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 dark:text-white">
                                    Create Tasks
                                </h3>
                                <h4 className="mt-2 text-base text-gray-700 dark:text-gray-200">Set tasks and assign the tasks between teams.</h4>
                            </div>
                        </li>
                        <li className="flex-start group relative flex lg:flex-col">
                            <span
                                className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                                aria-hidden="true"></span>
                            <div
                                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-purple-700 group-hover:bg-purple-700">
                                <RiNumber4 className="h-5 w-5 text-gray-600 group-hover:text-white" />
                            </div>
                            <div className="ml-6 lg:ml-0 lg:mt-10">
                                <h3
                                    className="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 dark:text-white">
                                    Enhance workflow
                                </h3>
                                <h4 className="mt-2 text-base text-gray-700 dark:text-gray-200">Use tools to Enhance your project management workflow.</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

        </div>
    );
};

export default RoadMap;