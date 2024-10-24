'use client';
import React from 'react';
import { useScreenRecorder } from '../../providers/ScreenRecorderProvider';
import { FaVideo, FaStop, FaDownload } from 'react-icons/fa';

const ScreenRecorder = () => {
  const { recording, paused, togglePauseResumeRecording, videoUrl, startRecording, stopRecording } = useScreenRecorder();

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  return (
    <section className="flex  flex-col items-center justify-center min-h-screen p-6">
      <h1 className="mb-6 text-4xl font-bold text-gray-800 dark:text-gray-100 text-center">Screen Recorder</h1>

      <div className="mb-6">
        {!recording ? (
          <button
            onClick={handleStartRecording}
            className="flex items-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            <FaVideo className="mr-2" />
            Start Recording
          </button>
        ) : (
          <>
            <button
              onClick={handleStopRecording}
              className="flex items-center px-6 py-3 text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
            >
              <FaStop className="mr-2" />
              Stop Recording
            </button>
          </>
        )}
      </div>

      {/* video functionality */}
      {videoUrl && (
        <div className="mt-4 p-4 w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 transform hover:scale-105">
          <video src={videoUrl} controls className="w-full h-48 object-cover rounded-t-lg" />
          <div className="py-4  flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Your Recording</span>
            <a
              href={videoUrl}
              download="recording.webm"
              className="flex items-center px-4 py-2 text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
            >
              <FaDownload className="mr-2" />
              Download Video
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScreenRecorder;
