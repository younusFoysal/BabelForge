import React from 'react';
import Hero from '../components/Home/Hero';
import Carousel from '../components/Home/Carousel';
import Sponser from '../components/Home/Sponser';
import LeaderCTA from '../components/Home/LeaderCTA';

const Home = () => {
  return (
    <div>
      <h2>This is home</h2>
      <h2 className="font-bold text-xl text-fuchsia-500 ">TailWind check</h2>
      <LeaderCTA></LeaderCTA>
    </div>
  );
};

export default Home;
