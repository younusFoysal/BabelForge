import React from "react";
import Image from "next/image";
import HeroLeft from "@/components/home/HeroNew/HeroLeft";
import homepic from "@/image/Home/light-dash.png"
import overlay from "@/image/Home/overlay.png"



const AwesomeHome = () => {


  const bgStyle = {
    backgroundImage: `url('/images/overlay.png')`,
    backgroundRepeat: 'repeat',
    opacity: 0.1,
  };

  return (
    <div className="mb-14">
      <section className="relative pb-0  min-h-screen flex items-center pt-32 lg:pt-52  lg:py-36 overflow-hidden bg-white dark:bg-slate-900  w-full">
        <div style={bgStyle}
          className={`absolute inset-0 dark:opacity-60 `}
        ></div>

        <div className="container mx-auto relative z-1">
          <div className="relative flex gap-5 flex-col-reverse lg:block">
            <div className="relative lg:h-auto h-[300px] right-0 lg:right-20 top-0 lg:-top-[110px]">
              {/* Circle 1 */}
              <div className="absolute lg:-top-0 -top-20 -right-32 w-[36rem] h-[36rem] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-full animate-[spin_120s_linear_infinite] z-0"></div>
              {/* Circle 2 */}
              <div className="absolute lg:-top-24 -top-36 -right-56 w-[48rem] h-[48rem] border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-full animate-[spin_240s_linear_infinite] z-0"></div>
              {/* Blurred gradient circle */}
              <div className="absolute lg:-top-0 -top-10 -right-40 w-[36rem] h-[36rem] bg-gradient-to-tl to-indigo-600/30 from-red-600/30 dark:to-indigo-600/50 dark:from-red-600/50 blur-[200px] rounded-full z-0"></div>

              <div className="absolute right-0 top-2 animate-float  lg:-right-[560px]  w-auto  lg:w-[800px] h-[300px] lg:h-[550px]">
                <Image
                  width={800}
                  height={800}
                  src={homepic}
                  className="h-full scale-90  lg:scale-[1.45] object-contain z-10"
                  alt="Dashboard Demo Image"
                />
              </div>
            </div>
            <div className="flex justify-between items-center px-4 w-full">
              <div className="mx-auto lg:ml-0">
                {/*new div*/}
                <HeroLeft />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwesomeHome;
