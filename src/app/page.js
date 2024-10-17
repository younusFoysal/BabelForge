"use client";
import AboutStatistics from "@/components/AboutUs/AboutStatistics";
import AwesomeHome from "@/components/home/AwesomeHome";
import CarouselHome from "@/components/home/CarouselHome";
import LeaderCTA from "@/components/home/LeaderCTA";
import Sponser from "@/components/home/Sponser";
import HomeLoadingSpinner from "@/components/shared/HomeLoadingSpinner/HomeLoadingSpinner";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import UserManual from "@/components/home/UserManual";

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
          <UserManual />

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
