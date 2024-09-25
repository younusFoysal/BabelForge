import React from 'react';
import Hero from '@/components/home/Hero';
import LeaderCTA from '@/components/home/LeaderCTA';
import Sponser from '@/components/home/Sponser';
import CallToAction from '@/components/home/CallToAction';
import Carouselhome from '@/components/home/Carouselhome';

const Home = () => {
  return (
    <div className="">
      <Hero />
        <Carouselhome />
      <Sponser />
      <LeaderCTA />

      <CallToAction />

    </div>
  );
};

export default Home;
