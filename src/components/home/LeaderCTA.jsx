import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import aiImage from '@/image/Home/call.png';
import Link from "next/link";

const LeaderCTA = () => {
  return (
    <div className="px-4">
      <div className=" bg-white/80 dark:bg-white/5 backdrop-blur-lg border-white/15 border-[1px] max-w-[1200px] rounded-2xl p-[40px] md:p-[75px] items-center mx-auto mb-[90px] grid grid-cols-1 md:grid-cols-2 gap-12  duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-800">
        <div className=" pr-0 md:pr-16">
          <Image className="max-w-[200px] mb-6" src={aiImage} alt="" width={300} height={200} />
          <h1 className=" font-extralight text-[30px] md:text-[50px] text-black dark:text-white leading-[30px] md:leading-[55px]">
            A Leader for the third year in a row!
          </h1>
        </div>
        <div>
          <h3 className="text-black dark:text-white font-light text-lg lg:text-[22px]">
            BabelForge.com recognized as a Leader in the 2024 Magic Quadrant™ for{' '}
            <strong className=" font-bold">Adaptive Project Management and Reporting</strong>{' '}
          </h3>
          <Link href="/dashboard">
          <button className="text-purple-700 dark:text-white hover:gap-5 duration-300 flex items-center text-[14px] gap-3 mt-7 border-b border-purple-700 dark:border-[#fff] pb-2">
            Get the your report <ArrowRight />
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaderCTA;
