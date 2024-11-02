"use client";

// aos package
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import PricingSingleCard from "./PricingSingleCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "@/lib/axiosCommon";

const PriceCard = () => {
  const axiosCommon = useAxiosCommon();
  // Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const services = [
    {
      title: "Basic",
      price: 0,
      priceDetails: "/ month",
      featuresTitle: "Everything on Basic:",
      features: [
        "Project Management",
        "1 Task Board",
        "Comments & Attachments (Limited)",
        "In-App Notifications",
      ],
      buttonText: "Get started",
    },
    {
      title: "Standard",
      price: 50,
      priceDetails: "/ month",
      featuresTitle: "Everything on Standard:",
      features: [
        "Unlimited Task Boards",
        "Progress Tracking",
        "Issue Reporting",
        "Real-Time Collaboration",
        "Email Notifications",
      ],
      buttonText: "Get standard now",
    },
    {
      title: "Premium",
      price: 150,
      priceDetails: "/ month",
      featuresTitle: "Everything on Premium:",
      features: [
        "Advanced Tracking & Reports",
        "Task Dependencies",
        "Custom Permissions",
        "Team Analytics",
        "Priority Support",
      ],
      buttonText: "Get premium now",
    },
  ];

  const {
    data: pricingData = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const data = await axiosCommon.get("/price/pricing");
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch lg:h-[100vh] -mx-4">
              {/* card 1 */}
              {pricingData.data.map((price) => (
                <PricingSingleCard key={price._id} pricing={price} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PriceCard;
