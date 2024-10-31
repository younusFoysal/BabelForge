import ContactForm from '@/components/Contactus/ContactForm';
import ContactText from '@/components/Contactus/ContactText';

export const metadata = {
  title: 'Contact Us | BabelForge',
  description: 'Get in touch with us for any queries or feedback.',
}

const Contactus = () => {
  return (
    <section className="container mx-auto mt-[130px]">
      {/* Parent div */}
      <div className="grid overflow-hidden grid-cols-1 mb-10 lg:grid-cols-2 gap-0 lg:gap-20 p-3 ">
        {/* child 1 */}
        <div>
          <ContactForm />
        </div>
        {/* child 2 */}
        <div className="lg:mt-0 mt-14">
          <ContactText />
        </div>
      </div>
    </section>
  );
};

export default Contactus;
