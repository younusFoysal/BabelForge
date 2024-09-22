"use client";

// aos package
import AOS from "aos";
import "aos/dist/aos.css";
import { Check, BadgeCheck } from "lucide-react";
import { useEffect } from "react";

const PriceCard = () => {
  // Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <section className="container mx-auto">
      {/* title */}
      <div className="my-6 text-center">
        <h1 className="text-5xl ">
          <span className="font-bold">Supercharge your teamwork.</span> Start
          free
        </h1>
        <p className="text-xl pt-5">
          Unlimited boards and workflows. No credit card needed
        </p>
      </div>

      {/* cards container */}
      <div>
        <section className="py-20  ">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-stretch lg:h-[100vh] -mx-4">
              {/* card 1 */}
              <div
                className="flex w-full mb-8  sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0 "
                data-aos="fade-down"
              >
                <div className="flex flex-grow flex-col p-6    sm:p-8  border-gray-400 border-[1px] rounded-3xl hover:shadow-2xl duration-500">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Basic</h4>
                    <p className="pt-4 ">
                      <span className="text-6xl font-extralight">
                        $<span className="font-bold">0</span>
                        <span className="text-sm font-normal pl-1">
                          /Free Forever
                        </span>
                      </span>
                    </p>
                  </div>

                  <p className="mt-4 leading-relaxed text-gray-600 font-semibold">
                    Free for your whole team
                  </p>

                  <button
                    type="button"
                    className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded-full bg-primary hover:bg-primary-dark text-gray-50 mb-10 mt-16  "
                  >
                    Try for Free
                  </button>

                  <p>For individuals looking to keep track of their work</p>

                  <span className="border-b-2 pt-6 "></span>

                  <h4 className="text-xl font-semibold my-4">Free includes:</h4>

                  <ul className="flex-1 mb-6 mt-4 text-gray-600 space-y-6">
                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>

                      <span>Up to 3 boards</span>
                    </li>

                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>

                      <span>Unlimited docs</span>
                    </li>

                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>
                      <span>200+ templates</span>
                    </li>
                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>
                      <span>8 column types</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* card 2 */}
              <div
                className="flex w-full mb-8   sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0"
                data-aos="fade-up"
              >
                <div className="flex flex-grow flex-col p-6    sm:p-8  border-gray-400 border-[1px] rounded-3xl hover:shadow-2xl duration-500">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Standard</h4>
                    <p className="pt-4 ">
                      <span className="text-6xl font-extralight">
                        $<span className="font-bold">9</span>
                        <span className="text-sm font-normal pl-1">/month</span>
                      </span>
                    </p>
                  </div>

                  <span className="mt-4 leading-relaxed text-gray-600 font-semibold">
                    Total $27/ month
                    <br />
                    <span className="font-light">Billed annually</span>
                  </span>

                  <button
                    type="button"
                    className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded-full bg-primary hover:bg-primary-dark text-gray-50 my-10 "
                  >
                    Try for Free
                  </button>

                  <p>Collaborate & optimize your work across teams </p>

                  <span className="border-b-2 pt-6 "></span>

                  <h4 className="text-xl font-semibold my-4">
                    Includes free, plus:
                  </h4>

                  <ul className="flex-1 mb-6 mt-4 text-gray-600 space-y-6">
                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>

                      <span>Timeline & Gantt views</span>
                    </li>

                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>

                      <span>Guest access</span>
                    </li>

                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>
                      <span>Create a dashboard that combines</span>
                    </li>
                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>
                      <span>8 column types</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* card 3 */}
              <div
                className="flex w-full mb-8   sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0"
                data-aos="fade-down"
              >
                <div className="flex flex-grow flex-col p-6    sm:p-8  border-gray-400 border-[1px] rounded-3xl hover:shadow-2xl duration-500">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Premium</h4>
                    <p className="pt-4 ">
                      <span className="text-6xl font-extralight">
                        $<span className="font-bold">19</span>
                        <span className="text-sm font-normal pl-1">/month</span>
                      </span>
                    </p>
                  </div>

                  <span className="mt-4 leading-relaxed text-gray-600 font-semibold">
                    Total $57/ month
                    <br />
                    <span className="font-light">Billed annually</span>
                  </span>

                  <button
                    type="button"
                    className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded-full bg-primary hover:bg-primary-dark text-gray-50 my-10 "
                  >
                    Try for Free
                  </button>

                  <p>Streamline complex workflows at scale</p>

                  <span className="border-b-2 pt-[48px] "></span>

                  <h4 className="text-xl font-semibold my-4">
                    Includes free, plus:
                  </h4>

                  <ul className="flex-1 mb-6 mt-4 text-gray-600 space-y-6">
                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>

                      <span>Private boards</span>
                    </li>

                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>

                      <span>Chart View</span>
                    </li>

                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>
                      <span>Formula Column</span>
                    </li>
                    <li className="flex mb-2 space-x-2">
                      <span className="text-green-600  text-lg">
                        <BadgeCheck size={20} className="mt-[2px]" />
                      </span>
                      <span>8 column types</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PriceCard;
