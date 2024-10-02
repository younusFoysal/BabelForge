"use client"
import React, {useEffect, useState} from "react";
import Hero from "@/components/home/Hero";
import LeaderCTA from "@/components/home/LeaderCTA";
import Sponser from "@/components/home/Sponser";
import CallToAction from "@/components/home/CallToAction";

import AboutStatistics from "@/components/AboutUs/AboutStatistics";
import HomeLoadingSpinner from "@/components/shared/HomeLoadingSpinner/HomeLoadingSpinner";

const Home = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

  return (
    <div>


        {
            loading ? (
                <HomeLoadingSpinner></HomeLoadingSpinner>
            ) : (
                <div className="">
                    <Hero/>
                    <Sponser/>
                    <AboutStatistics></AboutStatistics>
                    <LeaderCTA/>

                    <CallToAction/>
                </div>
            )
        }

    </div>
  );
};

export default Home;
