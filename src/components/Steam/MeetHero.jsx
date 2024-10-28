"use client";
import Image from "next/image";
import metimg from "@/image/Home/meetbanner.png";
import MeetingButton from "./MeetingButton";
import { IoIosVideocam } from "react-icons/io";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const MeetHero = () => {
  const [roomID, setRoomID] = useState("");
  const { userId } = useAuth();

  return (
    <div>
      <div className="max-w-screen-xl px-8 xl:px-16 mx-auto dark:bg" id="about">
        <div className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16">
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              Want anything to be easy with <strong>LaslesVPN</strong>.
            </h1>
            <p className="text-black-500 mt-4 mb-6">
              Provide a network for all your needs with ease and fun using
              LaslesVPN discover interesting features from us
            </p>
            {/* <div>
              <div className="flex items-center justify-center gap-4 ">
                <input
                  type="text"
                  id="roomid"
                  value={roomID}
                  onChange={(e) => setRoomID(e.target.value)}
                  className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
                  placeholder="Enter room ID to join a meeting"
                />
                <Link href={`/meet/${roomID}`} target="_blank">
                  <button
                    className="px-6 py-2.5 capitalize bg-gradient-to-r from-blue-600 to-purple-600  rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group   dark:bg-gray-50 text-white"
                    disabled={!roomID}
                  >
                    Join
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex items-center py-3 justify-center">
              <span className="mx-3 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div> */}
            <MeetingButton
              text="Create Meeting"
              icon={<IoIosVideocam size={20} />}
              userId={userId}
            />
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
