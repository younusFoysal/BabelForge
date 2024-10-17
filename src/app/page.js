"use client";
import React, { useEffect, useState } from "react";
import LeaderCTA from "@/components/home/LeaderCTA";
import Sponser from "@/components/home/Sponser";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import AboutStatistics from "@/components/AboutUs/AboutStatistics";
import HomeLoadingSpinner from "@/components/shared/HomeLoadingSpinner/HomeLoadingSpinner";
import AwesomeHome from "@/components/home/AwesomeHome";
import CarouselHome from "@/components/home/CarouselHome";
import PricingCards from "@/components/home/PricingCards";
import GlassHome from "@/components/home/3d/GlassHome";
import GlassDNA from "@/components/home/3d/GlassDNA";

import { useUser } from "@clerk/nextjs";

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
          <AwesomeHome />
          <Sponser />
          <CarouselHome />

          {/*<GlassHome/>*/}
          {/* <GlassDNA /> */}
          {/*glass_display pearl_electron */}

          <AboutStatistics></AboutStatistics>
          {/*<PricingCards/>*/}

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
