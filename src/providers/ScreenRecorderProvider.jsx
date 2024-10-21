
"use client";
import React, { createContext, useContext, useRef, useState } from "react";

const ScreenRecorderContext = createContext();

export const useScreenRecorder = () => {
    return useContext(ScreenRecorderContext);
};

const ScreenRecorderProvider = ({ children }) => {
    const [recording, setRecording] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const mediaRecorder = useRef(null);
    const recordedChunks = useRef([]);

    const startRecording = async () => {
        if (recording) return;

        try {
            
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always",
                },
                audio: true, 
            });

            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true, 
            });

            // Combine both streams into one
            const combinedStream = new MediaStream([
                ...displayStream.getTracks(),
                ...audioStream.getTracks(), 
            ]);

           
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            setRecording(false);
        }
    };

    return (
        <ScreenRecorderContext.Provider
            value={{
                recording,
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
