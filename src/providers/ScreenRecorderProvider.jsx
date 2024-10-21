'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const ScreenRecorderContext = createContext();

export const useScreenRecorder = () => {
  return useContext(ScreenRecorderContext);
};

const ScreenRecorderProvider = ({ children }) => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = event => {
      if (isRecording) {
        const message = 'Screen recording is in progress. Are you sure you want to leave?';
        event.preventDefault();
        event.returnValue = message; // For some browsers
        return message;
      }
    };
    // Add event listener globally
    window.addEventListener('beforeunload', handleBeforeUnload);
    // Cleanup when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isRecording]);

  const startRecording = async () => {
    setIsRecording(true);
    if (recording) return;

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always',
        },
        audio: true,
      });

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Combine both streams into one
      const combinedStream = new MediaStream([...displayStream.getTracks(), ...audioStream.getTracks()]);

      mediaRecorder.current = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm',
      });

      mediaRecorder.current.ondataavailable = event => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, {
          type: 'video/webm',
        });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        recordedChunks.current = [];
      };

      mediaRecorder.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Error accessing display media: ', err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  return (
    <ScreenRecorderContext.Provider
      value={{
        recording,
        isRecording,
        videoUrl,
        startRecording,
        stopRecording,
      }}
    >
      {children}
    </ScreenRecorderContext.Provider>
  );
};

export default ScreenRecorderProvider;
