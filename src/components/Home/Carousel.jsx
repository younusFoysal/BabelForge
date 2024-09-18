import { SwiperSlide, Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { IoMdCheckmark } from 'react-icons/io';
import ButtonSmall from '../Shared/Buttons/ButtonSmall';

// Carousel Items Object
const carouselItems = [
  {
    image: './home/carousel/tracking.png',
    sub_img: './home/carousel/sub_word.png',
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
    image: './home/carousel/team.png',
    sub_img: './home/carousel/sub_word.png',
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
    image: './home/carousel/crm.png',
    sub_img: './home/carousel/sub_crm.png',
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
    image: './home/carousel/it.png',
    sub_img: './home/carousel/sub_service.png',
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
    image: './home/carousel/overview.png',
    sub_img: './home/carousel/sub_word.png',
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
    image: './home/carousel/sprint.png',
    sub_img: './home/carousel/sub_dev.png',
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
    image: './home/carousel/creative_card.png',
    sub_img: './home/carousel/sub_word.png',
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

// Settings For Carouselß
const Carousel = () => {
  return (
    <section className="relative px-4 md:px-0">
      <Swiper
        slidesPerView={5}
        spaceBetween={16}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        navigation={true}
        modules={[Navigation]}
      >
        {carouselItems.map(item => (
          <SwiperSlide key={item.title}>
            <div
              className="relative cursor-pointer h-[350px] p-6 rounded-xl bg-primary bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <h2 className="font-semibold max-w-[150px] mb-2 text-3xl text-white">{item.title}</h2>
              <img className="max-h-[36px]" src={item.sub_img} alt="" />
              {/* Hover Item */}
              <div className="w-full pb-10 h-full opacity-0 hover:opacity-100 duration-500 top-0 left-0  rounded-xl absolute p-6 bg-[#000000cc]">
                <h4 className="text-[#c3c6d4] font-light text-[14px]">{item.hover_title}</h4>
                <img className="max-h-[48px]" src={item.sub_img} alt="" />
                <ul className="text-[#c3c6d4] font-light text-[14px] py-6 space-y-2">
                  {item.hover_items.map(hover_item => {
                    return (
                      <li className="flex items-center gap-[7px]" key={hover_item}>
                        <span className="bg-[#c3c6d4] rounded-full text-black text-[9px] p-[2px]">
                          <IoMdCheckmark />
                        </span>
                        {hover_item.title}
                      </li>
                    );
                  })}
                </ul>
                <ButtonSmall color="primary" text="Get Started"></ButtonSmall>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Carousel White Overlay */}
      {/* <div className="hidden md:block absolute z-[1] left-0 top-0 h-full w-[200px] bg-gradient-to-l from-[#ffffff00] to-[#fff]"></div>
      <div className="hidden md:block absolute z-[1] right-0 top-0 h-full w-[200px] bg-gradient-to-r from-[#ffffff00] to-[#fff]"></div> */}
    </section>
  );
};

export default Carousel;
