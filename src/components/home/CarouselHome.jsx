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

// Settings For Carousel
const CarouselHome = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container w-screen mx-auto py-12">
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default CarouselHome;

// {carouselItems?.map(item => (
//   <CarouselItem className="md:basis-1/2" key={item.title}>
//     <div
//       style={{ backgroundImage: `url(${item?.image})` }}
//       className="relative cursor-pointer h-[350px] bg-cover p-6 rounded-xl  bg-no-repeat bg-center"
//     >
//       <h2 className="font-semibold max-w-[150px] mb-2 text-3xl text-white">{item.title}</h2>
//       <Image layout="responsive" className=" size-2 lg:size-14 " src={item.sub_img} alt="" />
//       {/* Hover Item */}
//       <div className="w-full pb-10 h-full opacity-0 hover:opacity-100 duration-500 top-0 left-0  rounded-xl absolute p-6 bg-[#000000cc]">
//         <h4 className="text-[#c3c6d4] font-light text-[14px]">{item.hover_title}</h4>
//         <Image objectFit="contain" layout="responsive" className="size-1" src={item.sub_img} alt="" />
//         <ul className="text-[#c3c6d4] font-light text-[14px] py-6 space-y-2">
//           {item.hover_items.map(hover_item => {
//             return (
//               <li className="flex items-center gap-[7px]" key={hover_item}>
//                 <span className="bg-[#c3c6d4] rounded-full text-black text-[9px] p-[2px]">{/* <IoMdCheckmark /> */}</span>
//                 {hover_item.title}
//               </li>
//             );
//           })}
//         </ul>
//         <ButtonSmall color="primary" text="Get Started"></ButtonSmall>
//       </div>
//     </div>
//   </CarouselItem>
// ))}
