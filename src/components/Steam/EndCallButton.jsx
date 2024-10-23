"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

import { useRouter } from "next/navigation";
import { useMediaControl } from "./MediaControlProvider";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  if (!call)
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const { stopMedia } = useMediaControl();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const EndCall = async () => {
    await call.endCall();
    stopMedia();
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <button
      onClick={EndCall}
      className="bg-red-500 text-white px-3 py-2 rounded-md"
    >
      End call for everyone
    </button>
  );
};

export default EndCallButton;
