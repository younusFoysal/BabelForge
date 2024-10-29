import AdminPackages from '@/components/Admin/AdminPackages/AdminPackages';
import Faq from '@/components/Pricing/Faq';
import MobilePrice from '@/components/Pricing/MobilePrice';

const Pricing = () => {
  return (
    <section className="lg:px-0 bg-white/5 pb-[70px]px-4 ">
      <div className="hidden md:block">
        <AdminPackages priceingsec={true} />
      </div>
      <div className="block px-4 md:hidden pt-[120px]">
        <MobilePrice priceingsec={true} />
      </div>
      <div className="lg:pt-6">
        <Faq />
      </div>
    </section>
  );
};

export default Pricing;
