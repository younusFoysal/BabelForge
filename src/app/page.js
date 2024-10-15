"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/home/Hero";
import LeaderCTA from "@/components/home/LeaderCTA";
import Sponser from "@/components/home/Sponser";
import CallToAction from "@/components/home/CallToAction";

import AboutStatistics from "@/components/AboutUs/AboutStatistics";
import HomeLoadingSpinner from "@/components/shared/HomeLoadingSpinner/HomeLoadingSpinner";
import AwesomeHome from "@/components/home/AwesomeHome";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <ClerkLoading>
        <HomeLoadingSpinner></HomeLoadingSpinner>
      </ClerkLoading>
      <ClerkLoaded>
        <div className="">
          {/*<Hero />*/}
          <AwesomeHome />
          <Sponser />

          <AboutStatistics></AboutStatistics>
          <LeaderCTA />

          {/*<CallToAction />*/}
        </div>
      </ClerkLoaded>

      {/* <div className="absolute bottom-0 left-0">
        <script
          src="https://cdn.userway.org/widget.js"
          data-account="sz3Lj3xaQ0"
          async
        ></script>
      </div> */}
    </div>
  );
};

export default Home;
