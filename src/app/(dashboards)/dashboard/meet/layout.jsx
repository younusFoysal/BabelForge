import React from "react";
import StreamVideoProvider from "@/providers/StreamProvider";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import MediaControlProvider from "@/components/Steam/MediaControlProvider";
const layout = ({ children }) => {
  return (
    <>
      <MediaControlProvider>
        <StreamVideoProvider>{children}</StreamVideoProvider>
      </MediaControlProvider>
    </>
  );
};

export default layout;
