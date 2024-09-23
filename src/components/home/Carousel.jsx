import { SwiperSlide, Swiper } from "swiper/react";
import "./Carousel.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import ButtonSmall from "@/components/shared/Buttons/ButtonSmall";
import { Check } from "lucide-react";
import image1 from "@/image/Home/carousel/creative_card.avif";
import subimage1 from "@/image/Home/carousel/sub_service.avif";

// Carousel Items Object

const carouselItems = [
  {
    image: image1,
    sub_img: subimage1,
    title: "HR",
    hover_title: "Recommended product",
    hover_items: [
      { title: "Recruitment pipeline" },
      { title: "Engagement survey" },
      { title: "HR requests" },
      { title: "Onboarding & offboarding" },
    ],
  },
];

// Settings For Carousel
const Carousel = () => {
  return (
    <section className="relative px-4 md:px-0">
      <Swiper
        spaceBetween={16}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
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
        {carouselItems?.map((item) => (
          <SwiperSlide key={item.title}></SwiperSlide>
        ))}
      </Swiper>
      {/* Carousel White Overlay */}
      {/* <div className="hidden md:block absolute z-[1] left-0 top-0 h-full w-[200px] bg-gradient-to-l from-[#ffffff00] to-[#fff]"></div>
      <div className="hidden md:block absolute z-[1] right-0 top-0 h-full w-[200px] bg-gradient-to-r from-[#ffffff00] to-[#fff]"></div> */}
    </section>
  );
};

export default Carousel;
