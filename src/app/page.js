import React from 'react';
import Hero from '@/components/home/Hero';
import LeaderCTA from '@/components/home/LeaderCTA';
import Sponser from '@/components/home/Sponser';
import CallToAction from '@/components/home/CallToAction';
import CarouselHome from '@/components/home/CarouselHome';

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Sponser />
      <LeaderCTA />

      <CallToAction />
      <CarouselHome />
    </div>
  );
};

export default Home;
