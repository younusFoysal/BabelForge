import AdminPackages from "@/components/Admin/AdminPackages/AdminPackages";
import Faq from "@/components/Pricing/Faq";

export const metadata = {
  title: "Pricing | BabelForge",
  description: "Check out our pricing plans for our services.",
}

const Pricing = () => {
  return (
    <section className="lg:px-0 bg-white/5 pb-[70px]  px-4 pt-[120px]">
      <AdminPackages priceingsec={true} />
      <div className="lg:pt-6">
        <Faq />
      </div>
    </section>
  );
};

export default Pricing;
