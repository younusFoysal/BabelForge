'use client';
import Image from 'next/image';
import metimg from '@/image/Home/meetbanner.png';
import MeetingButton from './MeetingButton';
import { IoIosVideocam } from 'react-icons/io';
import { useAuth } from '@clerk/nextjs';
import usePlan from '@/hooks/usePlan';
import { redirect } from 'next/navigation';
const MeetHero = () => {
  const { userId } = useAuth();
  const [plan] = usePlan();
  if (plan === 'Basic') redirect('/dashboard');
  return (
    <div>
      <div className="max-w-6xl px-4 h-[calc(100vh-7rem)] flex items-center mx-auto">
        <div className="flex mt-10 md:mt-0 gap-10 md:gap-7 flex-col-reverse md:flex-row justify-center items-center">
          <div className="w-full text-center md:text-left md:w-1/2">
            <h1 className="text-3xl leading-[50px] md:!leading-[60px] lg:text-4xl xl:text-5xl font-medium text-black-600">
              BabelForge Virtual Meeting Hub
            </h1>
            <p className="text-black-500 text-[16px] opacity-80 mt-4 mb-6">
              Collaborate with your team effortlessly through high-quality video calls, ensuring smooth communication and real-time updates
            </p>

            <div className="flex justify-center md:justify-start">
              <MeetingButton text="Create Meeting" icon={<IoIosVideocam size={20} />} userId={userId} />
            </div>
          </div>
          <div className="flex w-full md:w-1/2">
            <div className="h-full flex justify-center w-full">
              <Image className="max-w-[250px] md:max-w-[500px] w-full" src={metimg} alt="meet banner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetHero;
