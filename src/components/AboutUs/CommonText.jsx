import React from 'react';

const CommonText = ({ text, text2, fullWidth }) => {
    return (
        <p className={`w-full ${fullWidth ? "lg:w-full" : "lg:w-2/5"} leading-relaxed text-md md:text-xl text-center lg:text-start`}>{text} <span className='font-bold'>{text2}</span> </p>
    );
};

export default CommonText;