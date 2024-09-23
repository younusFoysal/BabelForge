import React from 'react';

const AboutStatistics = () => {
    return (
        <div className='w-[90%] mx-auto bg-[#6161ff] text-white px-2 md:px-5 py-10 mt-16  rounded-xl space-y-16'>
            <h1 className='text-4xl md:text-7xl font-bold text-center'>babelforge.com by the numbers</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-center items-center'>
                <div className='border-r h-full space-y-3'>
                    <h3 className='text-xl md:text-4xl font-bold'>2014</h3>
                    <p className='text-sm md:text-lg'>Product launched</p>
                </div>
                <div className='border-r-0 md:border-r h-full space-y-3'>
                    <h3 className='text-xl md:text-4xl font-bold'>1900+</h3>
                    <p className='text-sm md:text-lg'>employees</p>
                </div>
                <div className='border-r h-full space-y-3'>
                    <h3 className='text-xl md:text-4xl font-bold'>200+</h3>
                    <p className='text-sm md:text-lg'>countries use <br /> babelforge.com</p>
                </div>

                <div className='h-full space-y-3'>
                    <h3 className='text-xl md:text-4xl font-bold'>225k+</h3>
                    <p className='text-sm md:text-lg'>customers use monday.com to manage their work</p>
                </div>
            </div>
        </div>
    );
};

export default AboutStatistics;