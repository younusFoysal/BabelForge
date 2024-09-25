import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import dashboardHeader from "../../image/dashboards/dashboardsHeader.png";
import Button from "../shared/Buttons";

const Header = () => {
  return (
    <section className="  bg-[#F0F3FF] dark:bg-[#7A1CAC] container mx-auto rounded-xl ">
      <div className="flex items-center flex-col container mx-auto">
        <div className="w-[90%] md:w-[40%] flex flex-col justify-center items-center text-center pt-14">
          <h6 className="text-blue-500">Dashboards</h6>
          <h1 className="text-3xl md:text-4xl md:leading-[55px] leading-[40px] font-bold">
            Track your team work progress with{" "}
            <span className="text-blue-600">dashboards</span>
          </h1>
          <p className="pt-4 pb-7 text-lg">
            Make smarter project decisions using data-driven insights. Let facts
            and trends guide your actions for better outcomes. Ready to take
            control?
          </p>
          <div className="flex flex-wrap md:justify-center gap-3 mb-10">
            <p className="flex items-center gap-1">
              <Check
                className="bg-black p-1 rounded-full"
                color="#fefbfb"
                size={16}
                strokeWidth={3}
              />
              10+ widgets & apps
            </p>
            <p className="flex items-center gap-1">
              <Check
                className="bg-black p-1 rounded-full font-bold"
                size={16}
                strokeWidth={3}
                color="#fefbfb"
              />
              Real time Communication
            </p>
            <p className="flex items-center gap-1">
              <Check
                className="bg-black p-1 rounded-full"
                color="#fefbfb"
                size={16}
                strokeWidth={3}
              />
              High-Level overview
            </p>
            <p className="flex items-center gap-1">
              <Check
                className="bg-black p-1 rounded-full"
                color="#fefbfb"
                size={16}
                strokeWidth={3}
              />
              Advance Reporting
            </p>
            <p className="flex items-center gap-1">
              <Check
                className="bg-black p-1 rounded-full"
                color="#fefbfb"
                size={16}
                strokeWidth={3}
              />
              No code customization
            </p>
          </div>
          <Button text="get started" icon={<ArrowRight size={20} />} />

          <div className="lg:w-[1000px] mt-10">
            <Image
              className="w-full"
              height={1500}
              width={3000}
              layout="responsive"
              src={dashboardHeader}
              alt="Dashboard Header"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
