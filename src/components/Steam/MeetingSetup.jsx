"use client";
import {
  useCall,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import MeetingButton from "./MeetingButton";
import { IoIosVideocam } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";

const MeetingSetup = ({ setIsSetupComplete, meetingLink }) => {
  const [mictoggleon, setmictoogleon] = useState(false);
  const calls = useCall();
  const { useCallEndedAt } = useCallStateHooks();
  const callEndedAt = useCallEndedAt();
  const callHasEnded = !!callEndedAt;

  if (callHasEnded) return toast.error("Call has ended");

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

        <MeetingButton
          className="from-blue-600 to-purple-600"
          text=" Copy Invitation"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("meeting link copied ");
          }}
          icon={<MdContentCopy size={18} />}
        ></MeetingButton>
      </div>
    </div>
  );
};

export default MeetingSetup;
