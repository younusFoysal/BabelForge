import React from 'react';
import Hero from '../components/Home/Hero';
import Carousel from '../components/Home/Carousel';
import Sponser from '../components/Home/Sponser';

const Home = () => {
  return (
    <div>
      <Hero />
      <Carousel></Carousel>
      <Sponser></Sponser>
    </div>
  );
};

export default Home;
