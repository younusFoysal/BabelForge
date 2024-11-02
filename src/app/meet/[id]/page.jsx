'use client';

import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import HomeLoadingSpinner from '@/components/shared/HomeLoadingSpinner/HomeLoadingSpinner';
import './Meet.css';

const RoomId = ({ params }) => {
  const { user } = useUser();
  const { userId, isLoaded } = useAuth();
  const roomID = params.id;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      setLoading(false);
    }
  }, [isLoaded, user]);

  const userInfo = user?.username || user?.fullName || user?.firstName || 'user' + Date.now();

  let myMeeting = async element => {
    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userId, userInfo, 720);

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Shareable link',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div className="w-full h-screen meet_container">
      {loading ? <HomeLoadingSpinner /> : <div className="w-full meet  h-screen" ref={myMeeting}></div>}
    </div>
  );
};

export default RoomId;
