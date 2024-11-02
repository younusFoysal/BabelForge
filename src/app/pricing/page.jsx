import AdminPackages from '@/components/Admin/AdminPackages/AdminPackages';
import MobilePrice from '@/components/Pricing/MobilePrice';
import FAQ from '@/components/home/FAQ';

export const metadata = {
  title: 'Pricing | BabelForge',
  description: 'Check out our pricing plans for our services.',
};

const Pricing = () => {
  return (
    <section className="lg:px-0  pb-[40px] px-4 ">
      <div className="hidden md:block">
        <AdminPackages priceingsec={true} />
      </div>
      <div className="block px-4 md:hidden pt-[120px]">
        <MobilePrice priceingsec={true} />
      </div>
      <div className="lg:pt-6">
        <FAQ isBG={false} />
      </div>
    </section>
  );
};

export default Pricing;
