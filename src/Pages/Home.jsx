import React from 'react';
import Hero from '../components/Home/Hero';
import Carousel from '../components/Home/Carousel';
import Sponser from '../components/Home/Sponser';
import LeaderCTA from "../components/Home/LeaderCTA.jsx";
import CallToAction from "../components/Home/CallToAction.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <Carousel></Carousel>
      <Sponser></Sponser>
      <LeaderCTA></LeaderCTA>
      <CallToAction></CallToAction>
    </div>
  );
};

export default Home;
