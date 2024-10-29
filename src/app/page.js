'use client';
import AboutStatistics from '@/components/home/AboutStatistics';
import AwesomeHome from '@/components/home/AwesomeHome';
import CarouselHome from '@/components/home/CarouselHome';
import LeaderCTA from '@/components/home/LeaderCTA';
import Sponser from '@/components/home/Sponser';
import HomeLoadingSpinner from '@/components/shared/HomeLoadingSpinner/HomeLoadingSpinner';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import AllReviews from '@/components/Reviews/AllReviews';
import GlassDNA from '@/components/home/3d/GlassDNA';
import { MarqueeDemoVertical, ReviewCard } from '@/components/Reviews/MarqueeDemoVertical';
import HomeStats from '@/components/home/Hero/HomeStats';
import dynamic from 'next/dynamic';
import PricingCards from "@/components/home/PricingCards";
import RoadMap from "@/components/home/RoadMap";
import FAQ from "@/components/home/FAQ";
import PricingHome from "@/components/home/Pricing";


const categories = [
  {
    name: 'General',
    questions: [
      { question: 'How can I pay for my appointment?', answer: 'Lorem ipsum dolor sit amet...' },
      { question: 'What documents do I need to bring?', answer: 'Lorem ipsum dolor sit amet...' }
    ]
  },
  {
    name: 'Trust & Safety',
    questions: [
      { question: 'How do you handle sensitive information?', answer: 'Lorem ipsum dolor sit amet...' },
      { question: 'What safety protocols are in place?', answer: 'Lorem ipsum dolor sit amet...' }
    ]
  },
  {
    name: 'Services',
    questions: [
      { question: 'What are your opening hours?', answer: 'Lorem ipsum dolor sit amet...' },
      { question: 'Can I book an appointment online?', answer: 'Lorem ipsum dolor sit amet...' }
    ]
  }
];

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
           <GlassDNA />
          {/*glass_display pearl_electron */}
          {/*  <HomeStats/>*/}

          <AboutStatistics></AboutStatistics>
          <RoadMap/>
          {/*<PricingCards/>*/}
          <PricingHome/>


          <LeaderCTA />
          {/* <AllReviews /> */}
          <MarqueeDemoVertical />

          <FAQ categories={categories}/>


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
