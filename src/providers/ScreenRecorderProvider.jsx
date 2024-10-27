"use client";
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

const ScreenRecorderContext = createContext();

export const useScreenRecorder = () => {
  return useContext(ScreenRecorderContext);
};

const ScreenRecorderProvider = ({ children }) => {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (recording) {
        event.preventDefault();
        event.returnValue = "Are you sure?";
      }
    };

    if (recording) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [recording]);

  const startRecording = async () => {
    if (recording) return;

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: true,
      });

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const combinedStream = new MediaStream([
        ...displayStream.getTracks(),
        ...audioStream.getTracks(),
      ]);

      mediaRecorder.current = new MediaRecorder(combinedStream, {
        mimeType: "video/webm",
      });

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        recordedChunks.current = [];
      };

      mediaRecorder.current.start();
      setRecording(true);
      setPaused(false);
    } catch (err) {
      console.error("Error accessing display media: ", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();

      mediaRecorder.current.stream.getTracks().forEach((track) => {
        track.stop();
      });

      setRecording(false);
      setPaused(false);
    }
  };

  const togglePauseResumeRecording = () => {
    if (mediaRecorder.current && recording) {
      if (paused) {
        mediaRecorder.current.resume();
        setPaused(false);
      } else {
        mediaRecorder.current.pause();
        setPaused(true);
      }
    }
  };

  return (
    <ScreenRecorderContext.Provider
      value={{
        recording,
        paused,
        videoUrl,
        startRecording,
        stopRecording,
        togglePauseResumeRecording,
      }}
    >
      {children}
    </ScreenRecorderContext.Provider>
  );
};

export default ScreenRecorderProvider;
