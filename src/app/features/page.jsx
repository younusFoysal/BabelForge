import React from 'react';
import Header from "@/components/DashboardsPage/Header";
import DashboardCard from "@/components/DashboardsPage/DashboardCard";
import card1 from "@/image/dashboards/card1.png";
import card2 from "@/image/dashboards/card2.png";
import card3 from "@/image/dashboards/card3.png";
import Button from "@/components/shared/Buttons";
import {ArrowRight} from "lucide-react";
import Sponser from "@/components/home/Sponser";
import Review from "@/components/DashboardsPage/Review";

const Page = () => {
  return (
    <div>
      <section>
        <Header />
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl  text-center my-12">
            Get all of your data control in one place
          </h2>
          <DashboardCard
            row={"row"}
            subtitle={"High-level overview"}
            title={"Gain real-time insights"}
            description={
              "Easily analyze your data and simplify strategic decision-making with custom dashboards. Run reports, create summaries, track progress, and get a high-level overview of your entire organization."
            }
            image={card1}
          />
          <DashboardCard
            row={"row-reverse"}
            subtitle={"Dashboard customization"}
            title={"View data your way"}
            description={
              "Build the reporting tools you need for your business with customizable no-code dashboards. Add widgets such as charts and timeline to help further visualize your data and stay up-to-date on progress and results."
            }
            image={card2}
          />
          <DashboardCard
            row={"row"}
            subtitle={"Resource management"}
            title={"Prioritize work smarter"}
            description={
              "Adapt to changes and prioritize workloads strategically to boost team productivity and facilitate more efficient workflows. Quickly identify what needs your attention and catch potential risks before they happen."
            }
            image={card3}
          />
        </div>
        {/* Make decision section */}
        <div className="bg-[#eceff8] dark:bg-gray-800 p-20 flex flex-col justify-center">
          <div className="text-center space-y-5 container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold">
              Make decisions with confidence
            </h1>
            <p className="text-lg">
              Ready to see how monday.com improves alignment across teams?
            </p>
            <div className="flex justify-center">
              <Button text="get started" icon={<ArrowRight size={20} />} />
            </div>
          </div>
        </div>
        <Sponser />
        <Review></Review>
      </section>
    </div>
  );
};

export default Page;
