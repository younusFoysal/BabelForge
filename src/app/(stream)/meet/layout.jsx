import React from "react";
import StreamVideoProvider from "@/providers/StreamProvider";
import "@stream-io/video-react-sdk/dist/css/styles.css";
const layout = ({ children }) => {
  return (
    <>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </>
  );
};

export default layout;
