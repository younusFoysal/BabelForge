import React from 'react';
import { ModeToggle } from '../Theme/ModeToggle';
import { UserButton } from '@clerk/nextjs';
import { useScreenRecorder } from '@/providers/ScreenRecorderProvider';
import { VscRecord } from 'react-icons/vsc';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import { CgRecord } from 'react-icons/cg';
import { useRouter } from 'next/navigation';

const DashboardTopRight = () => {
  const { recording, videoUrl, startRecording, stopRecording } = useScreenRecorder();
  const router = useRouter();

  //   handle start record
  const handleRec = () => {
    if (!recording) {
      startRecording();
    } else if (recording) {
      stopRecording();
      toast({
        description: 'Recoding Ended',
      });
      router.push('/dashboard/ScreenRecorder');
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <Video />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 px-3 py-2 text-[14px] rounded-md space-y-2"> */}
      {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
      {/* 
          <button
            disabled={recording}
            onClick={handleStartRec}
            className={`${
              recording ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
            } w-full hover:bg-blue-900 duration-300 bg-blue-600 text-white border py-[6px] rounded-md`}
          >
            Start Recording
          </button>
          <button
            disabled={!recording}
            onClick={handleStopRec}
            className={` ${
              !recording ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
            } w-full hover:bg-red-500  py-[6px] rounded-md bg-red-600 text-white`}
          >
            Stop Recording
          </button>
        </DropdownMenuContent>
      </DropdownMenu> */}
      <button
        onClick={handleRec}
        className={` ${
          !recording ? 'hover:bg-[#960ece] hover:text-white' : ' bg-red-600 text-white'
        } h-full flex duration-200 rounded-md py-[4px] px-2 border  items-center gap-1`}
      >
        <CgRecord className={`${recording && ' animate-pulse duration-1000 text-white'}  text-[18px]`} />{' '}
        <span className="text-[12px]">{!recording ? 'Start Record' : 'Stop Record'}</span>
      </button>
      <ModeToggle />
      <UserButton />
    </div>
  );
};

export default DashboardTopRight;
