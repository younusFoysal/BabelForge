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
      <div className="max-w-screen-xl h-screen px-8 xl:px-16 mx-auto dark:bg" id="about">
        <div className="flex h-full gap-7 flex-row justify-center items-center">
          <div className="w-1/2">
            <h1 className="text-3xl !leading-[60px] lg:text-4xl xl:text-5xl font-medium text-black-600">
              Want anything to be easy with <strong>LaslesVPN</strong>.
            </h1>
            <p className="text-black-500 mt-4 mb-6">
              Provide a network for all your needs with ease and fun using LaslesVPN discover interesting features from us
            </p>

            <MeetingButton text="Create Meeting" icon={<IoIosVideocam size={20} />} userId={userId} />
          </div>
          <div className="flex w-1/2">
            <div className="h-full w-full">
              <Image src={metimg} alt="meet banner" quality={100} width={612} height={383} layout="responsive" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetHero;
