'use client';
import React, { useEffect, useState } from 'react';
import { ModeToggle } from '../Theme/ModeToggle';
import { UserButton } from '@clerk/nextjs';
import { useScreenRecorder } from '@/providers/ScreenRecorderProvider';
import { toast } from '@/hooks/use-toast';
import { CgRecord } from 'react-icons/cg';
import { useRouter } from 'next/navigation';
import { FaPause, FaPlay } from 'react-icons/fa6';
import { BadgeCheck } from 'lucide-react';

const DashboardTopRight = () => {
  const { recording, paused, togglePauseResumeRecording, videoUrl, startRecording, stopRecording } = useScreenRecorder();
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Effect to handle the timer logic
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(prevTime => prevTime + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;
  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };
  const formatTime = unit => String(unit).padStart(2, '0');

  useEffect(() => {
    if (recording) {
      start();
    } else if (!recording) {
      stop();
      reset();
    }
  }, [recording]);

  useEffect(() => {
    if (paused) {
      stop();
    } else if (!paused) {
      start();
    }
  }, [paused]);

  //   handle start record
  const handleRec = () => {
    if (!recording) {
      startRecording();
    } else if (recording) {
      stopRecording();
      stop();
      reset();
      toast({
        description: 'Recoding Ended',
      });
      router.push('/dashboard/ScreenRecorder');
    }
  };

  return (
    <div className="flex duration-500 items-center gap-4">
      <button
        onClick={handleRec}
        className={` ${
          !recording
            ? 'bg-gradient-to-r dark:border-transparent hover:border-transparent border border-[#979797] from-blue-600 to-purple-600  text-white'
            : ' bg-red-600 text-white'
        } h-full flex duration-200 rounded-md py-[4px] px-2 border  items-center gap-1`}
      >
        <CgRecord className={`${recording && ' animate-pulse duration-1000 text-white'}  text-[18px]`} />{' '}
        <span className="text-[12px]">
          {!recording ? 'Start Record' : `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`}
        </span>
      </button>
      {recording && (
        <button onClick={togglePauseResumeRecording} className="duration-500">
          {!paused ? <FaPause className=" duration-500 text-[20px]" /> : <FaPlay className="duration-500 text-[20px]" />}
        </button>
      )}
      <ModeToggle />

      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link label="Profile" href="/dashboard/profile" labelIcon={<BadgeCheck size={15} />} />
          <UserButton.Action label="manageAccount" />
          <UserButton.Action label="signOut" />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
};

export default DashboardTopRight;
