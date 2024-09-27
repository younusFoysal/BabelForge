"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "@/components/AboutUs/AboutCarousel.css";
import { MdOutlineEventAvailable } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiCustomerService2Fill } from "react-icons/ri";

// Custom Arrow Icon
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="flex opacity-60 md:opacity-100 justify-center absolute z-30 hover:border border-[#fff] top-1/2 left-10 md:left-16 -translate-y-1/2 text-xl md:text-2xl items-center text-white rounded-full bg-black cursor-pointer w-10 h-10 md:w-14 md:h-14"
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
      className="flex opacity-60 md:opacity-100 justify-center absolute top-1/2 hover:border border-[#fff] right-10 md:right-16 z-30 -translate-y-1/2 text-xl md:text-2xl items-center text-white rounded-full bg-black cursor-pointer w-10 h-10 md:w-14 md:h-14"
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );
}

const AboutCarousel = () => {
  const settings = {
    dots: false,
    className: "centers",
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 2,
    speed: 500,
    swipeToSlide: true,
    centerPadding: "200px",
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
    <div className="slider-container relative my-12 w-screen mx-auto pt-8">
      <h2 className="text-center  text-[24px] text-[#333] font-semibold dark:text-white">
        What would you like to manage?
      </h2>
      <Slider className="py-9 " {...settings}>
        <div
          style={{ width: 200 }}
          className="my-12 carousel_div py-12   opacity-20 text-center px-8  md:px-14  rounded-xl"
        >
          <MdOutlineEventAvailable className="text-[55px] mx-auto block mb-4" />
          <p className="text-[#6161ff] mb-5 font-semibold text-3xl">
            Community Events
          </p>
          <p className="text-xl mb-4">
            We have launched a new series of events for our community ,
            including live sessions with monday.com product managers. These
            sessions are an opportunity for our community to connect directly
            with the team behind the features that they are using every day.
          </p>
          <p className="font-semibold text-[18px]"> April 2024</p>
        </div>
        <div
          style={{ width: 200 }}
          className="my-12 carousel_div py-12  opacity-20 text-center px-8  md:px-14    rounded-xl"
        >
          <HiOutlineLightBulb className="text-[50px] mx-auto block mb-4" />
          <p className="text-[#6161ff] mb-5 font-semibold text-3xl">
            {" "}
            We are onto something...
          </p>
          <p className="text-xl mb-4">
            The monday.com co-founders discovered deep, shared pain points
            across teams around the world and built a prototype for what is
            known today as monday.com.
          </p>
          <p className="font-semibold text-[18px]"> April 2024</p>
        </div>
        <div
          style={{ width: 200 }}
          className="my-12 carousel_div py-12  opacity-20 text-center px-8  md:px-14    rounded-xl"
        >
          <RiCustomerService2Fill className="text-[50px] mx-auto block mb-4" />
          <p className="text-[#6161ff] mb-5 font-semibold text-3xl">
            {" "}
            Our first customers!
          </p>
          <p className="text-xl mb-4">
            After two years, monday.com officially launched from a tiny “office”
            (but really a vacated apartment) in Tel Aviv and hosted its{" "}
            <a className="text-[#6161ff]" href="#">
              first board meeting
            </a>{" "}
            after onboarding our first 6 customers.
          </p>
          <p className="font-semibold text-[18px]"> April 2024</p>
        </div>
      </Slider>
    </div>
  );
};

export default AboutCarousel;
