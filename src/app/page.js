import React from "react";
import Hero from "@/components/home/Hero";
import LeaderCTA from "@/components/home/LeaderCTA";
import Sponser from "@/components/home/Sponser";
import CallToAction from "@/components/home/CallToAction";

import AboutStatistics from "@/components/AboutUs/AboutStatistics";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Sponser />
      <AboutStatistics></AboutStatistics>
      <LeaderCTA />

      <CallToAction />
    </div>
  );
};

export default Home;
