import React from 'react';
import Button from '../shared/Buttons';
import Image from 'next/image';
import shape from '@/image/About/shape.png'
import { ArrowRight } from 'lucide-react';

const JoinTeamCTA = () => {
    return (
        <div className='bg-[#1f0f83] flex justify-between w-[90%] mx-auto rounded-xl mt-24 mb-20'>
            <div className='p-10 w-full md:w-[60%] flex flex-col items-start justify-center'>
                <h2 className='text-2xl md:text-3xl xl:text-5xl text-white'><span className='font-bold'>Together we can impact</span> how
                    teams work across the globe</h2>
                <Button
                    text="Join our team!"
                    className={"mt-8"}
                    icon={<ArrowRight size={20} />}
                />
            </div>
            <div className='hidden md:block w-[35%]'>
                <Image
                    className='rounded-xl w-full h-full object-cover'
                    src={shape}
                    alt='shape image'
                />
            </div>
        </div>
    );
};

export default JoinTeamCTA;