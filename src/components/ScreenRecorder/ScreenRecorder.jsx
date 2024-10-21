"use client";
import React from 'react';
import { useScreenRecorder } from '../../providers/ScreenRecorderProvider';
import { FaVideo, FaStop, FaDownload } from 'react-icons/fa'; 

const ScreenRecorder = () => {
    const { recording, videoUrl, startRecording, stopRecording } = useScreenRecorder();

    const handleStartRecording = () => {
        startRecording();
    };

    const handleStopRecording = () => {
        stopRecording();
    };

    return (
        <section className="flex  flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-200 to-indigo-300">

            <h1 className="mb-6 text-4xl font-bold text-gray-800">Screen Recorder</h1>

           
        </section>
    );
};

export default ScreenRecorder;
