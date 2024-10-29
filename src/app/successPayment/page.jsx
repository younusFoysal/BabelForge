'use client';
import useAxiosCommon from '@/lib/axiosCommon';
import { useSearchParams } from 'next/navigation';
import paymentImage from '@/image/payment/payDone.png';
import Image from 'next/image';

import { useUser } from '@clerk/nextjs';
import { FaArrowLeft } from 'react-icons/fa6';

const Page = () => {
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;

  const axiosComon = useAxiosCommon();
  const searchParams = useSearchParams();

  const paymentIntent = searchParams.get('payment_intent');
  const redirectStatus = searchParams.get('redirect_status');
  const city = searchParams.get('city');
  const address = searchParams.get('address');
  const last_name = searchParams.get('last_name');
  const first_name = searchParams.get('first_name');
  const amount = searchParams.get('amount');
  const category = searchParams.get('category');

  const userinfo = {
    first_name,
    last_name,
    address,
    city,
    amount,
    status: redirectStatus,
    paymentMethod: 'card',
    email: uemail,
    date: new Date(),
    pakage: category,
    transactionId: paymentIntent,
  };

  const handlesubmit = async () => {
    try {
      const { data } = await axiosComon.post('pay/payment', userinfo);

      const userpack = await axiosComon.put(`api/users/update/${uemail}`, {
        package: category,
      });

      if (data.insertedId) {
        window.location.href = '/';
      }
    } catch (e) {
      toast({
        description: 'Failed to send payment details',
        variant: 'error',
      });
      console.error(e);
    }
  };

  return (
    <div className="px-5 h-screen flex items-center justify-start">
      <div className="mx-auto max-w-[490px]">
        <Image height={500} width={500} src={paymentImage} alt="illustration" />
        <div className="mt-7.5 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold text-purple-700 dark:text-white">Your Payment Sent Successfully!</h2>
          <p className="font-medium text-black dark:text-white">
            Thank you for connecting with BabelForge. Simply manage your project in an efficient way. Stay connected!
          </p>
          <a
            onClick={handlesubmit}
            className="mt-7.5 inline-flex group items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600  text-white px-6 py-3 font-medium hover:scale-105 duration-500 hover:bg-opacity-90 hover:shadow-xl mt-5 cursor-pointer"
          >
            <span className="group-hover:-translate-x-2 duration-500 transition-all">
              {' '}
              <FaArrowLeft />
            </span>

            <span>Back to Home</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
