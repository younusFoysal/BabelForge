import React from 'react';
import Image from 'next/image';
import ButtonSmall from '@/components/shared/Buttons/ButtonSmall';
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import tracking from '@/image/Home/carousel/tracking.jpg';
import sub_img from '@/image/Home/carousel/sub_word.png';

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
  // {
  //   image: '@/image/Home/carousel/team.jpg',
  //   sub_img: '@/image/Home/carousel/sub_word.png',
  //   title: 'Marketing',
  //   hover_title: 'Recommended product',
  //   hover_items: [
  //     { title: 'Social media planner' },
  //     { title: 'Marketing strategy' },
  //     { title: 'HR requests' },
  //     { title: 'Content calendar' },
  //   ],
  // },
  // {
  //   image: '@/image/Home/carousel/crm.jpg',
  //   sub_img: '@/image/Home/carousel/sub_crm.png',
  //   title: 'Sales & CRM',
  //   hover_title: 'Recommended product',
  //   hover_items: [
  //     { title: 'Social media planner' },
  //     { title: 'Marketing strategy' },
  //     { title: 'HR requests' },
  //     { title: 'Content calendar' },
  //   ],
  // },
  // {
  //   image: '@/image/Home/carousel/it.jpg',
  //   sub_img: '@/image/Home/carousel/sub_service.png',
  //   title: 'IT & Support',
  //   hover_title: 'Recommended product',
  //   hover_items: [
  //     { title: 'Social media planner' },
  //     { title: 'Marketing strategy' },
  //     { title: 'HR requests' },
  //     { title: 'Content calendar' },
  //   ],
  // },
  // {
  //   image: '@/image/Home/carousel/overview.jpg',
  //   sub_img: '@/image/Home/carousel/sub_word.png',
  //   title: 'Operations',
  //   hover_title: 'Recommended product',
  //   hover_items: [
  //     { title: 'Social media planner' },
  //     { title: 'Marketing strategy' },
  //     { title: 'HR requests' },
  //     { title: 'Content calendar' },
  //   ],
  // },
  // {
  //   image: '@/image/Home/carousel/sprint.jpg',
  //   sub_img: '@/image/Home/carousel/sub_dev.png',
  //   title: 'Product & Dev',
  //   hover_title: 'Recommended product',
  //   hover_items: [
  //     { title: 'Social media planner' },
  //     { title: 'Marketing strategy' },
  //     { title: 'HR requests' },
  //     { title: 'Content calendar' },
  //   ],
  // },
  // {
  //   image: '@/image/Home/carousel/creative_card.jpg',
  //   sub_img: '@/image/Home/carousel/sub_word.png',
  //   title: 'Creative & Design',
  //   hover_title: 'Recommended product',
  //   hover_items: [
  //     { title: 'Social media planner' },
  //     { title: 'Marketing strategy' },
  //     { title: 'HR requests' },
  //     { title: 'Content calendar' },
  //   ],
  // },
];

// Settings For Carousel
const Carousel = () => {
  return (
    <div className="container mx-auto">
      <Carousel>
        <CarouselContent>
          {carouselItems?.map(item => (
            <CarouselItem key={item.title}>
              <div
                className="relative cursor-pointer h-[350px] p-6 rounded-xl bg-primary bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <h2 className="font-semibold max-w-[150px] mb-2 text-3xl text-white">{item.title}</h2>
                <Image className="max-h-[36px]" src={item.sub_img} alt="" height={600} width={400} />
                {/* Hover Item */}
                <div className="w-full pb-10 h-full opacity-0 hover:opacity-100 duration-500 top-0 left-0  rounded-xl absolute p-6 bg-[#000000cc]">
                  <h4 className="text-[#c3c6d4] font-light text-[14px]">{item.hover_title}</h4>
                  <Image className="max-h-[36px]" src={item.sub_img} alt="" height={600} width={400} />
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Carousel;
