import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import dashboardHeader from '../../image/dashboards/dashboardsHeader.png';
import Button from '../shared/Buttons';

const Header = () => {
  return (
    <section className="  bg-white/80 dark:bg-white/5 backdrop-blur-lg border-white/15 border-[1px] mt-5 container  mx-auto rounded-xl ">
      <div className="flex items-center flex-col container mx-auto">
        <div className="w-[90%] text-white md:w-[40%] flex flex-col justify-center items-center text-center pt-14">
          <h6 className="text-purple-700">Dashboards</h6>
          <h1 className="text-3xl md:text-4xl text-black dark:text-white md:leading-[55px] leading-[40px] font-bold">
            Track your team work progress with <span className="text-purple-700">dashboards</span>
          </h1>
          <p className="pt-4 pb-7 text-lg text-black dark:text-white">
            Make smarter project decisions using data-driven insights. Let facts and trends guide your actions for better outcomes. Ready to
            take control?
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <p className="flex items-center gap-1">
              <Check className="bg-purple-500 dark:bg-white p-1 text-white dark:text-black rounded-full" size={16} strokeWidth={3} />
              <span className="text-black dark:text-white"> 10+ widgets & apps </span>
            </p>
            <p className="flex items-center gap-1">
              <Check className="bg-purple-500 dark:bg-white p-1 text-white dark:text-black rounded-full" size={16} strokeWidth={3}  />
              <span className="text-black dark:text-white"> Real time Communication</span>
            </p>
            <p className="flex items-center gap-1">
              <Check className="bg-purple-500 dark:bg-white p-1 text-white dark:text-black rounded-full"  size={16} strokeWidth={3} />
              <span className="text-black dark:text-white"> High-Level overview</span>
            </p>
            <p className="flex items-center gap-1">
              <Check className="bg-purple-500 dark:bg-white p-1 text-white dark:text-black rounded-full"  size={16} strokeWidth={3} />
              <span className="text-black dark:text-white"> Advance Reporting</span>
            </p>
            <p className="flex items-center gap-1">
              <Check className="bg-purple-500 dark:bg-white p-1 text-white dark:text-black rounded-full"  size={16} strokeWidth={3} />
              <span className="text-black dark:text-white"> No code customization</span>
            </p>
          </div>
          <Button text="get started" icon={<ArrowRight size={20} />} />

          <div className="lg:w-[1000px] mt-10">
            <Image className="w-full" height={1500} width={3000} layout="responsive" src={dashboardHeader} alt="Dashboard Header" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
