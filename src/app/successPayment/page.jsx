'use client';
import useAxiosCommon from '@/lib/axiosCommon';
import { useSearchParams } from 'next/navigation';
import paymentImage from '@/image/payment/payDone.png';
import Image from 'next/image';

import { useUser } from '@clerk/nextjs';

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
    <div className="rounded-sm   px-5 shadow-default h-screen bg-transparent dark:bg-boxdark sm:py-20">
      <div className="mx-auto max-w-[490px]">
        <Image height={500} width={500} src={paymentImage} alt="illustration" />
        <div className="mt-7.5 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold text-white">Your Payment Sent Successfully!</h2>
          <p className="font-medium text-white">
            Thank you for connecting BabelForge. Simply manage your project in an efficient way. Stay connected!
          </p>
          <a
            onClick={handlesubmit}
            className="mt-7.5 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90 mt-5 cursor-pointer"
          >
            <svg className="fill-current" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.7492 6.38125H2.73984L7.52109 1.51562C7.77422 1.2625 7.77422 0.86875 7.52109 0.615625C7.26797 0.3625 6.87422 0.3625 6.62109 0.615625L0.799219 6.52187C0.546094 6.775 0.546094 7.16875 0.799219 7.42188L6.62109 13.3281C6.73359 13.4406 6.90234 13.525 7.07109 13.525C7.23984 13.525 7.38047 13.4687 7.52109 13.3562C7.77422 13.1031 7.77422 12.7094 7.52109 12.4563L2.76797 7.64687H14.7492C15.0867 7.64687 15.368 7.36562 15.368 7.02812C15.368 6.6625 15.0867 6.38125 14.7492 6.38125Z"
                fill=""
              />
            </svg>
            <span>Back to Home</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
