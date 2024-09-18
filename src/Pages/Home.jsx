import Carousel from '../components/Home/Carousel';
import Sponser from '../components/Home/Sponser';

const Home = () => {
  return (
    <div>
      <h2>This is home</h2>
      <h2 className="font-bold text-xl text-fuchsia-500 ">TailWind check</h2>

      <Carousel></Carousel>
      <Sponser></Sponser>
    </div>
  );
};

export default Home;
