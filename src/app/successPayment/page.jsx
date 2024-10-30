import paymentImage from '@/image/payment/payDone.png';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa6';
import Link from 'next/link';

 const metadata = {
  title: "Payment | BabelForge",
  description: "Make a payment for your order.",
}

const Page = () => {
  return (
    <div className="px-5 h-screen flex items-center justify-start">
      <div className="mx-auto max-w-[490px]">
        <Image height={500} width={500} src={paymentImage} alt="illustration" />
        <div className="mt-7.5 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold text-purple-700 dark:text-white">Your Payment Sent Successfully!</h2>
          <p className="font-medium text-black dark:text-white">
            Thank you for connecting with BabelForge. Simply manage your project in an efficient way. Stay connected!
          </p>
          <Link
            href="/"
            className="mt-7.5 inline-flex group items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600  text-white px-6 py-3 font-medium hover:scale-105 duration-500 hover:bg-opacity-90 hover:shadow-xl mt-5 cursor-pointer"
          >
            <span className="group-hover:-translate-x-2 duration-500 transition-all">
              {' '}
              <FaArrowLeft />
            </span>

            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
