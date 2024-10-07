import React from "react";
import StreamVideoProvider from "@/providers/StreamProvider";
import { ClerkProvider } from "@clerk/nextjs";
import SteamNavber from "@/components/Steam/Navbar";
import "@stream-io/video-react-sdk/dist/css/styles.css";
const layout = ({ children }) => {
  return (
    <ClerkProvider>
      <SteamNavber />
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </ClerkProvider>
  );
};

export default layout;
