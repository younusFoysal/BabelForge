"use client";

import MeetingRoom from "@/components/Steam/MeetingRoom";
import MeetingSetup from "@/components/Steam/MeetingSetup";
import { useGetCallbyId } from "@/hooks/useGetcall";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

const Meeting = () => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { id } = useParams();
  const { callLoading, Call } = useGetCallbyId(id);

  if (!user && !isLoaded) return <h1>you have to login first</h1>;

  if (!isLoaded || callLoading) return <div>Loading...</div>;

  const meetingLink = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/stream/meeting/${id}`;

  return (
    <main className="h-screen w-full">
      <StreamCall call={Call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup
              setIsSetupComplete={setIsSetupComplete}
              meetingLink={meetingLink}
            />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
