import CallToAction from "../components/Home/CallToAction";
import Hero from '../components/Home/Hero';
import Carousel from '../components/Home/Carousel';
import Sponser from '../components/Home/Sponser';

const Home = () => {
  return (
    <div>
      <Hero />
      <Carousel></Carousel>
      <Sponser></Sponser>
      <CallToAction></CallToAction>
    </div>
  );
};

export default Home;
