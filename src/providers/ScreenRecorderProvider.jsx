'use client';
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const ScreenRecorderContext = createContext();

export const useScreenRecorder = () => {
  return useContext(ScreenRecorderContext);
};

const ScreenRecorderProvider = ({ children }) => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);

  // Effect to warn the user before reload/close
  useEffect(() => {
    const handleBeforeUnload = event => {
      if (recording) {
        event.preventDefault();
        event.returnValue = 'are you sure'; // This shows the confirmation dialog
      }
    };

    if (recording) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [recording]);

  const startRecording = async () => {
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
