"use client";

import { useEffect, useRef } from "react";

import { useAuth } from "@clerk/nextjs";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import useMeet from "@/hooks/useMeet";

const RoomId = ({ params }) => {
  const { fullName } = useMeet();
  const { userId } = useAuth();
  const roomID = params.id;
  const roomContainerRef = useRef(null);

  useEffect(() => {
    if (!roomContainerRef.current) return;

    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userId,
      fullName || "user" + Date.now(),
      720
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Start the call
    zp.joinRoom({
      container: roomContainerRef.current,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  }, [fullName, userId, roomID]);

  return <div className="w-full h-screen" ref={roomContainerRef}></div>;
};

export default RoomId;
