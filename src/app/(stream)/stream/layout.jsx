import React from "react";
import StreamVideoProvider from "@/providers/StreamProvider";
import SteamNavber from "@/components/Steam/Navbar";
import "@stream-io/video-react-sdk/dist/css/styles.css";
const layout = ({ children }) => {
  return (
    <>
      <SteamNavber />
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </>
  );
};

export default layout;
