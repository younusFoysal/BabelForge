"use client";

import { createContext, useContext, useState } from "react";

const MediaControlContext = createContext();

export const useMediaControl = () => {
  return useContext(MediaControlContext);
};

const MediaControlProvider = ({ children }) => {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);

  const startMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      stream.getVideoTracks().forEach((track) => {
        track.enabled = true;
      });
      stream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });

      setCameraEnabled(true);
      setMicrophoneEnabled(true);
    } catch (err) {
      console.error("Error accessing camera or microphone: ", err);
    }
  };

  const stopMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      });

    setCameraEnabled(false);
    setMicrophoneEnabled(false);
  };

  return (
    <MediaControlContext.Provider
      value={{
        cameraEnabled,
        microphoneEnabled,
        startMedia,
        stopMedia,
      }}
    >
      {children}
    </MediaControlContext.Provider>
  );
};

export default MediaControlProvider;
