import ScreenRecorder from '@/components/ScreenRecorder/ScreenRecorder';
import React from 'react';

export const metadata = {
    title: "Screen Recorder | BabelForge",
    description: "Screen Recorder for BabelForge",
}

const page = () => {
    return (
        <div>

            <ScreenRecorder></ScreenRecorder>
            
        </div>
    );
};

export default page;