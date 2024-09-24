import React from 'react';
import Hero from '@/components/home/Hero';
import LeaderCTA from '@/components/home/LeaderCTA';
import Sponser from '@/components/home/Sponser';
import CallToAction from '@/components/home/CallToAction';
import Carousels from '@/components/home/Carousels';
import Carousel from '@/components/home/Carousel';

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Sponser />
      <LeaderCTA />
      <Carousels />
      <CallToAction />
      <Carousel />
    </div>
  );
};

export default Home;
