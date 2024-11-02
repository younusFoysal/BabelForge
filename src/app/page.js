"use client";
import AboutStatistics from "@/components/home/AboutStatistics";
import AwesomeHome from "@/components/home/AwesomeHome";
import CarouselHome from "@/components/home/CarouselHome";
import LeaderCTA from "@/components/home/LeaderCTA";
import Sponser from "@/components/home/Sponser";
import HomeLoadingSpinner from "@/components/shared/HomeLoadingSpinner/HomeLoadingSpinner";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import GlassDNA from "@/components/home/3d/GlassDNA";
import {
  MarqueeDemoVertical,
  ReviewCard,
} from "@/components/Reviews/MarqueeDemoVertical";
import RoadMap from "@/components/home/RoadMap";
import FAQ from "@/components/home/FAQ";
import PricingHome from "@/components/home/Pricing";

const Home = () => {
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
          {/*  <HomeStats/>*/}

          <AboutStatistics></AboutStatistics>
          <RoadMap />
          {/*<PricingCards/>*/}
          <PricingHome />

          <LeaderCTA />
          {/* <AllReviews /> */}
          <MarqueeDemoVertical />

          <FAQ isBG={true} />

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
