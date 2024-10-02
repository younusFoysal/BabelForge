import Faq from "@/components/Pricing/Faq";
import PriceCard from "@/components/Pricing/PriceCard";


const Pricing = () => {
  return (
    <section className="lg:px-0 px-4">
      <PriceCard />
      <div className="lg:pt-10">
        <Faq />
      </div>

    </section>
  );
};

export default Pricing;
