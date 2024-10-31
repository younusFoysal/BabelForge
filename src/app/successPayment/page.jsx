'use client'
import paymentImage from '@/image/payment/payDone.png';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

 const metadata = {
  title: "Payment | BabelForge",
  description: "Make a payment for your order.",
}

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/dashboard');

    }
    , 1000
  )
    
  }, [router]);
  return (
    <div className="px-5 h-screen flex items-center justify-start">
      <div className="mx-auto max-w-[490px]">
        <Image height={500} width={500} src={paymentImage} alt="illustration" />
        <div className="mt-7.5 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold text-purple-700 dark:text-white">Your Payment Sent Successfully!</h2>
          <p className="font-medium text-black dark:text-white">
            Thank you for connecting with BabelForge. Simply manage your project in an efficient way. Stay connected!
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Page;
