'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import ButtonSmall from '@/components/shared/Buttons/ButtonSmall';
import tracking from '@/image/Home/carousel/tracking.jpg';
import sub_img from '@/image/Home/carousel/sub_word.png';
import sub_service from '@/image/Home/carousel/sub_service.png';
import team from '@/image/Home/carousel/team.jpg';
import crm from '@/image/Home/carousel/crm.jpg';
import it from '@/image/Home/carousel/it.jpg';
import overview from '@/image/Home/carousel/overview.jpg';
import creative_card from '@/image/Home/carousel/creative_card.jpg';
import sprint from '@/image/Home/carousel/sprint.jpg';
import sub_crm from '@/image/Home/carousel/sub_crm.png';
import sub_dev from '@/image/Home/carousel/sub_dev.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

// Carousel Items Object
const carouselItems = [
  {
    image: tracking,
    sub_img: sub_img,
    title: 'HR',
    hover_title: 'Recommended product',
    hover_items: [
      { title: 'Recruitment pipeline' },
      { title: 'Engagement survey' },
      { title: 'HR requests' },
      { title: 'Onboarding & offboarding' },
    ],
  },
  {
    image: team,
    sub_img: sub_img,
    title: 'Marketing',
    hover_title: 'Recommended product',
    hover_items: [
      { title: 'Social media planner' },
      { title: 'Marketing strategy' },
      { title: 'HR requests' },
      { title: 'Content calendar' },
    ],
  },
  {
    image: crm,
    sub_img: sub_crm,
    title: 'Sales & CRM',
    hover_title: 'Recommended product',
    hover_items: [
      { title: 'Social media planner' },
      { title: 'Marketing strategy' },
      { title: 'HR requests' },
      { title: 'Content calendar' },
    ],
  },
  {
    image: it,
    sub_img: sub_service,
    title: 'IT & Support',
    hover_title: 'Recommended product',
    hover_items: [
      { title: 'Social media planner' },
      { title: 'Marketing strategy' },
      { title: 'HR requests' },
      { title: 'Content calendar' },
    ],
  },
  {
    image: overview,
    sub_img: sub_img,
    title: 'Operations',
    hover_title: 'Recommended product',
    hover_items: [
      { title: 'Social media planner' },
      { title: 'Marketing strategy' },
      { title: 'HR requests' },
      { title: 'Content calendar' },
    ],
  },
  {
    image: sprint,
    sub_img: sub_dev,
    title: 'Product & Dev',
    hover_title: 'Recommended product',
    hover_items: [
      { title: 'Social media planner' },
      { title: 'Marketing strategy' },
      { title: 'HR requests' },
      { title: 'Content calendar' },
    ],
  },
  {
    image: creative_card,
    sub_img: sub_img,
    title: 'Creative & Design',
    hover_title: 'Recommended product',
    hover_items: [
      { title: 'Social media planner' },
      { title: 'Marketing strategy' },
      { title: 'HR requests' },
      { title: 'Content calendar' },
    ],
  },
];

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

// Settings For Carousel
const CarouselHome = () => {
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
        {carouselItems?.map(item => (
          <div className="px-2" key={item.title}>
            <div
              style={{ backgroundImage: `url(${item?.image?.src})` }}
              className="relative cursor-pointer h-[350px] bg-cover p-6 rounded-xl  bg-no-repeat bg-center"
            >
              <h2 className="font-semibold max-w-[150px] mb-2 text-3xl text-white">{item.title}</h2>
              <Image className="max-w-[160px]" src={item.sub_img} alt="sub_image" />
              {/* Hover Item */}
              <div className="w-full pb-10 h-full opacity-0 hover:opacity-100 duration-500 top-0 left-0  rounded-xl absolute p-6 bg-[#000000cc]">
                <h4 className="text-[#c3c6d4] font-light text-[14px]">{item.hover_title}</h4>
                <Image className="max-w-[200px]" src={item.sub_img} alt="" />
                <ul className="text-[#c3c6d4] font-light text-[14px] py-6 space-y-2">
                  {item.hover_items.map(hover_item => {
                    return (
                      <li className="flex items-center gap-[7px]" key={hover_item}>
                        <span className="bg-[#c3c6d4] rounded-full text-black text-[9px] p-[2px]">{/* <IoMdCheckmark /> */}</span>
                        {hover_item.title}
                      </li>
                    );
                  })}
                </ul>
                <ButtonSmall color="primary" text="Get Started"></ButtonSmall>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {/* Carousel White Overlay */}
      <div className="hidden md:block absolute z-20 left-0 top-0 h-full w-[200px] bg-gradient-to-l from-[#ffffff00] to-[#fff]"></div>
      <div className="hidden md:block absolute z-20 right-0 top-0 h-full w-[200px] bg-gradient-to-r from-[#ffffff00] to-[#fff]"></div>
    </div>
  );
};

export default CarouselHome;
