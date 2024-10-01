"use client";

// aos package
import AOS from "aos";
import "aos/dist/aos.css";
import { Check, BadgeCheck } from "lucide-react";
import { useEffect } from "react";
import PricingSingleCard from "./PricingSingleCard";

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
              <PricingSingleCard />
              <PricingSingleCard />
              <PricingSingleCard />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PriceCard;
