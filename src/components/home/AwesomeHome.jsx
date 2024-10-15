<<<<<<< HEAD
import React from "react";
import Image from "next/image";
import HeroLeft from "@/components/home/HeroNew/HeroLeft";

const AwesomeHome = () => {
  return (
    <div>
      <section className="relative table lg:py-40 md:py-36 pt-36 pb-24 overflow-hidden bg-white dark:bg-slate-900 h-screen w-full">
        <div
          className={`absolute inset-0 bg-[url('/images/overlay.png')] bg-repeat opacity-10 dark:opacity-60 `}
        ></div>

        <div className=" container mx-auto relative z-1">
          <div className="relative  mt-10 ">
            <div className="relative">
              <div className="absolute right-0 -top-20">
                {/* Circle 1 */}
                <div className="absolute lg:-top-0 -top-20 -right-32 w-[36rem] h-[36rem] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-full animate-[spin_120s_linear_infinite] z-0"></div>
                {/* Circle 2 */}
                <div className="absolute lg:-top-24 -top-36 -right-56 w-[48rem] h-[48rem] border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-full animate-[spin_240s_linear_infinite] z-0"></div>
                {/* Blurred gradient circle */}
                <div className="absolute lg:-top-0 -top-10 -right-40 w-[36rem] h-[36rem] bg-gradient-to-tl to-indigo-600/30 from-red-600/30 dark:to-indigo-600/50 dark:from-red-600/50 blur-[200px] rounded-full z-0"></div>

                <div className="absolute top-4 -right-80 w-[800px] h-[550px]">
                  <Image
                    width={800}
                    height={800}
                    src="/images/light-dash.png"
                    className=" w-full h-full relative z-10"
                    alt=""
                  />
                </div>
              </div>

              <div className="flex mt-12 justify-between items-center px-4 w-full">
                <div>
                  {/*new div*/}
                  <HeroLeft />
                  {/*<div class="">*/}
                  {/*    <div class="lg:me-6 lg:text-start text-center">*/}
                  {/*        <h1 class="font-bold lg:leading-normal leading-normal text-4xl lg:text-6xl mb-5">Access*/}
                  {/*            powerful AI For <span*/}
                  {/*                class="typewrite bg-gradient-to-tl to-indigo-600 from-red-600 text-transparent bg-clip-text"*/}
                  {/*                data-period="2000"*/}
                  {/*                data-type='[ "Ai Content", "Blog Writing", "Technical Writing" ]'> <span*/}
                  {/*                class="wrap"></span> </span></h1>*/}
                  {/*        <p class="text-lg max-w-xl lg:ms-0 mx-auto">Beatae cum eius, animi itaque aliquid*/}
                  {/*            ducimus facere dicta, vitae ipsam maiores nam sit blanditiis, quisquam expedita?</p>*/}

                  {/*        <div class="subcribe-form mt-6 mb-3">*/}
                  {/*            <form class="relative max-w-md mx-auto lg:ms-0">*/}
                  {/*                <div class="relative">*/}
                  {/*                    <i class="uil uil-envelope text-xl absolute top-3 left-5"></i>*/}
                  {/*                    <input type="email" id="aiemail" name="email"*/}
                  {/*                           class="py-4 pe-40 ps-12 w-full h-[50px] outline-none text-black dark:text-white rounded-md bg-white/60 dark:bg-slate-900/60 shadow dark:shadow-gray-800"*/}
                  {/*                           placeholder="support@techwind.com"/>*/}
                  {/*                </div>*/}
                  {/*                <button type="submit"*/}
                  {/*                        class="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 hover:border-indigo-700 text-white rounded-md">Sign*/}
                  {/*                    Up*/}
                  {/*                </button>*/}
                  {/*            </form>*/}

                  {/*        </div>*/}
                  {/*    </div>*/}
                  {/*</div>*/}
                </div>
=======
import React from 'react';
import Image from 'next/image';
import HeroLeft from '@/components/home/HeroNew/HeroLeft';

const AwesomeHome = () => {
  return (
    <div className="mb-14">
      <section className="relative pb-0 pt-20 h-screen flex items-center  lg:py-36 overflow-hidden bg-white dark:bg-slate-900  w-full">
        <div className={`absolute inset-0 bg-[url('/images/overlay.png')] bg-repeat opacity-10 dark:opacity-60 `}></div>

        <div className="container mx-auto relative z-1">
          <div className="relative flex gap-5 flex-col-reverse lg:block">
            <div className="relative lg:h-auto h-[300px] right-0 lg:right-20 top-0 lg:-top-[110px]">
              {/* Circle 1 */}
              <div className="absolute lg:-top-0 -top-20 -right-32 w-[36rem] h-[36rem] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-full animate-[spin_120s_linear_infinite] z-0"></div>
              {/* Circle 2 */}
              <div className="absolute lg:-top-24 -top-36 -right-56 w-[48rem] h-[48rem] border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-full animate-[spin_240s_linear_infinite] z-0"></div>
              {/* Blurred gradient circle */}
              <div className="absolute lg:-top-0 -top-10 -right-40 w-[36rem] h-[36rem] bg-gradient-to-tl to-indigo-600/30 from-red-600/30 dark:to-indigo-600/50 dark:from-red-600/50 blur-[200px] rounded-full z-0"></div>

              <div className="absolute right-0 animate-float top-0 lg:-right-[560px]  w-auto  lg:w-[800px] h-[300px] lg:h-[550px]">
                <Image
                  width={800}
                  height={800}
                  src="/images/light-dash.png"
                  className="h-full scale-90  lg:scale-[1.45] object-contain z-10"
                  alt="Dashboard Demo Image"
                />
              </div>
            </div>
            <div className="flex justify-between items-center px-4 w-full">
              <div className="mx-auto lg:ml-0">
                {/*new div*/}
                <HeroLeft />
>>>>>>> ad0b448e07d05f3bec52351fb764ba95a30a815c
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwesomeHome;
