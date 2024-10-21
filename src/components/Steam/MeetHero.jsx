import Image from "next/image";
import React from "react";
import metimg from "@/image/Home/meetbanner.png";
const MeetHero = ({ MeetButton }) => {
  return (
    <div>
      <div className="max-w-screen-xl px-8 xl:px-16 mx-auto " id="about">
        <div className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              Want anything to be easy with <strong>LaslesVPN</strong>.
            </h1>
            <p className="text-black-500 mt-4 mb-6">
              Provide a network for all your needs with ease and fun using
              LaslesVPN discover interesting features from us.
            </p>
            {MeetButton}
          </div>
          <div className="flex w-full">
            <div className="h-full w-full">
              <Image
                src={metimg}
                alt="meet banner"
                quality={100}
                width={612}
                height={383}
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetHero;
