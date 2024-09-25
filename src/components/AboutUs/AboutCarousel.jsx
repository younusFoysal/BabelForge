'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

// Custom Arrow Icon
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="flex justify-center absolute z-30 hover:border border-[#fff] top-1/2 left-10 md:left-16 -translate-y-1/2 text-xl md:text-2xl items-center text-white rounded-full bg-black cursor-pointer w-10 h-10 md:w-14 md:h-14"
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="flex justify-center absolute top-1/2 hover:border border-[#fff] right-10 md:right-16 z-30 -translate-y-1/2 text-xl md:text-2xl items-center text-white rounded-full bg-black cursor-pointer w-10 h-10 md:w-14 md:h-14"
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );
}

const AboutCarousel = () => {
  // const customCarousel = {
  //   opacity: '100',
  //   boxShadow: '0px 0px 24px rgba(0,0,0,.101025)',
  // };

  const settings = {
    dots: false,
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    speed: 800,
    swipeToSlide: true,
    centerPadding: '200px',
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className=" relative w-screen mx-auto pt-8">
      <h2 className="text-center mb-10 text-[24px] text-[#333] font-semibold">What would you like to manage?</h2>
      <Slider {...settings}>
        <div className="ml-4 md:ml-[90px] opacity-20  py-12 text-center  px-10 md:basis-1/2   rounded-xl">
          <FaArrowRight className="text-[50px] mx-auto block mb-4" />
          <p className="text-[#6161ff] mb-5 font-semibold text-3xl">Community Events</p>
          <p className="text-xl mb-4">
            We have launched a new series of events for our community , including live sessions with monday.com product managers. These
            sessions are an opportunity for our community to connect directly with the team behind the features that they are using every
            day.
          </p>
          <p className="font-semibold text-[18px]"> April 2024</p>
        </div>
        <div className="ml-4 md:ml-[90px] opacity-20  py-12 text-center  px-10 md:basis-1/2   rounded-xl">
          <FaArrowRight className="text-[50px] mx-auto block mb-4" />
          <p className="text-[#6161ff] mb-5 font-semibold text-3xl">Community Events</p>
          <p className="text-xl mb-4">
            We have launched a new series of events for our community , including live sessions with monday.com product managers. These
            sessions are an opportunity for our community to connect directly with the team behind the features that they are using every
            day.
          </p>
          <p className="font-semibold text-[18px]"> April 2024</p>
        </div>
        <div className="ml-4 md:ml-[90px] opacity-20  py-12 text-center  px-10 md:basis-1/2   rounded-xl">
          <FaArrowRight className="text-[50px] mx-auto block mb-4" />
          <p className="text-[#6161ff] mb-5 font-semibold text-3xl">Community Events</p>
          <p className="text-xl mb-4">
            We have launched a new series of events for our community , including live sessions with monday.com product managers. These
            sessions are an opportunity for our community to connect directly with the team behind the features that they are using every
            day.
          </p>
          <p className="font-semibold text-[18px]"> April 2024</p>
        </div>
        <div className="ml-4 md:ml-[90px] opacity-20  py-12 text-center  px-10 md:basis-1/2   rounded-xl">
          <FaArrowRight className="text-[50px] mx-auto block mb-4" />
          <p className="text-[#6161ff] mb-5 font-semibold text-3xl">Community Events</p>
          <p className="text-xl mb-4">
            We have launched a new series of events for our community , including live sessions with monday.com product managers. These
            sessions are an opportunity for our community to connect directly with the team behind the features that they are using every
            day.
          </p>
          <p className="font-semibold text-[18px]"> April 2024</p>
        </div>
      </Slider>
    </div>
  );
};

export default AboutCarousel;
