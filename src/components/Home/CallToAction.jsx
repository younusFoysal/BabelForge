import React from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import Button from '../Shared/Button';

const CallToAction = () => {
    return (
        <div className='bg-[#1f0f83] flex flex-col md:flex-row items-center justify-between gap-10 p-12 leading-relaxed'>
            <div className='w-full md:w-3/5'>
                <h1 className='text-white text-3xl md:text-4xl lg:text-6xl font-extralight text-center md:text-start'>Deliver your best work with <span className='text-gray-300'>babelforge.com</span></h1>
                <div className='w-full flex justify-center md:justify-start'>
                    <Button text="Get Started" className={"mt-5"} icon={<IoMdArrowForward size={20} />} />
                </div>
            </div>
            <img className='w-full md:w-2/5' src="./Home/call.png" alt="Call to Action" />
        </div>
    );
};

export default CallToAction;