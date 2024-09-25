import CallToAction from "@/components/home/CallToAction";
import Carousels from "@/components/home/Carousels";
import Hero from "@/components/home/Hero";
import LeaderCTA from "@/components/home/LeaderCTA";
import Sponser from "@/components/home/Sponser";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Sponser />
      <LeaderCTA />
      <Carousels />
      <CallToAction />
    </div>
  );
};

export default Home;
