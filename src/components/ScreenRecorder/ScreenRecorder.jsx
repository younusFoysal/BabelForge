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

            <div className="mb-6">
                {!recording ? (
                    <button
                        onClick={handleStartRecording}
                        className="flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                    >
                        <FaVideo className="mr-2" />
                        Start Recording
                    </button>
                ) : (
                    <button
                        onClick={handleStopRecording}
                        className="flex items-center px-6 py-3 text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
                    >
                       
                        Stop Recording
                    </button>
                )}
            </div>

        </section>
    );
};

export default ScreenRecorder;
