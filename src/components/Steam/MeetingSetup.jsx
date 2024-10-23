"use client";
import {
  useCall,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";

import { toast } from "@/hooks/use-toast";
import MeetingButton from "./MeetingButton";
import { IoIosVideocam } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import SteamNavber from "./MeetNavbar";
import { ShareLink } from "../Doc/ShareLink";

const MeetingSetup = ({ setIsSetupComplete, meetingLink }) => {
  const [mictoggleon, setmictoogleon] = useState(false);
  const calls = useCall();
  const { useCallEndedAt } = useCallStateHooks();
  const callEndedAt = useCallEndedAt();
  const callHasEnded = !!callEndedAt;

  if (callHasEnded)
    return toast({
      description: "call has ended ",
    });

  if (!calls) throw new Error("use call is must be Component");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (mictoggleon) {
      calls?.camera.disable();
      calls?.microphone.disable();
    } else {
      calls?.camera.enable();
      calls?.microphone.enable();
    }
  }, [mictoggleon, calls?.camera, calls?.microphone]);

  return (
    <div className="">
      <SteamNavber />
      <div className="w-full h-screen flex justify-center items-center gap-4 flex-col ">
        <h1 className=" text-white font-bold text-2xl capitalize">
          meeting setup
        </h1>
        <VideoPreview />
        <div className="flex gpa-2 items-center text-xl h-10">
          <input
            type="checkbox"
            checked={mictoggleon}
            onChange={(e) => setmictoogleon(e.target.checked)}
          />
          <span className="pl-2 text-white"> Mic and camera disabled</span>
        </div>
        <div className="mt-4 flex gap-4 items-center">
          <MeetingButton
            text="join metting"
            handleClick={() => {
              calls.join();
              setIsSetupComplete(true);
            }}
            icon={<IoIosVideocam size={20} />}
          ></MeetingButton>
          <ShareLink colour={true} />
        </div>
      </div>
    </div>
  );
};

export default MeetingSetup;
