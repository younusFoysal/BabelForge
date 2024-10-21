
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
