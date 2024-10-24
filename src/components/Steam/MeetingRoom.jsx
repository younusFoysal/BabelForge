"use client";

import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import EndCallButton from "./EndCallButton";
import { toast } from "@/hooks/use-toast";
import { useMediaControl } from "@/components/Steam/MediaControlProvider";
const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const router = useRouter();
  const { stopMedia } = useMediaControl();
  const call = useCall();
  const { useCallEndedAt } = useCallStateHooks();
  const callEndedAt = useCallEndedAt();
  const callHasEnded = !!callEndedAt;

  useEffect(() => {
    if (callHasEnded) {
      toast({
        description: "call has ended",
        variant: "success",
      });
      call.camera.disable();
      call.microphone.disable();
      router.push("/dashboard");
      router.refresh();
    }
  }, [callHasEnded, stopMedia, router]);

  const LeaveCall = async () => {
    await call.endCall();
    call.camera.disable();
    call.microphone.disable();
    router.push("/dashboard");
    router.refresh();
  };

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const GirdData = ["Grid", "Speaker-Left", "Speaker-Right"];

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex h-full items-center justify-center">
        <div className="flex w-full max-w-[1250px] overflow-hidden ">
          <CallLayout />
        </div>
        <div
          className={cn(
            "fixed right-0 top-0 h-full w-[100%] sm:w-[30%] md:w-[20%] bg-gray-800 rounded-md p-5 transition-all duration-500 ease-in-out",
            {
              "translate-x-0": showParticipants,
              "translate-x-full": !showParticipants,
            }
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>

        <div className="fixed bottom-0 flex gap-5 justify-center items-center pt-4 flex-wrap w-full px-4">
          <CallControls onLeave={LeaveCall} />
          {/* <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] transition-all duration-300">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 dark:text-white">
              {GirdData.map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() => setLayout(item.toLowerCase())}
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-dark-1" />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] transition-all duration-300">
              <Users size={20} className="text-white" />
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
