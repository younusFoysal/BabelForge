/* eslint-disable react/no-unescaped-entities */
import banner1 from "@/image/About/banner1.jpg";
import Image from "next/image";
import CommonText from "./CommonText";

const AboutFirstBanner = () => {
  return (
    <div className="my-10 space-y-16">
      {/* Banner headline */}
      <div className="flex flex-col lg:flex-row items-center px-2 lg:px-24 text-center lg:text-start">
        <div className="w-full lg:w-3/5 text-3xl md:text-6xl font-bold space-y-3 py-10 ">
          <p>So how did</p>
          <p className="text-[#6c6cff]">babelforge.com</p>
          <p>come to be?</p>
        </div>
        <CommonText text="Well for us, it happened somewhere in between collaborating and communicating, engaging, and scaling rapidly. All while being totally transparent and working the way we want."></CommonText>
      </div>
      {/* main banner part */}

      <div className="relative">
        {/* <div style={{ backgroundImage: `url(${banner1})` }}></div>  -->Not working */}
        <Image
          className="max-h-[800px] object-cover"
          src={banner1}
          alt="banner image"
          layout="intrinsic"
          height={500}
          width={2000}
        />

        <div className="absolute w-full h-full top-0 left-0 bg-black opacity-30 text-8xl"></div>

        <div className="absolute left-[40px] md:left-[120px] top-1/2 -translate-y-1/2  text-white font-bold text-3xl md:text-6xl lg:text-8xl space-y-1 md:space-y-5">
          <p>It's all</p>
          <p>about</p>
          <p>the</p>
          <p>people</p>
        </div>
      </div>
    </div>
  );
};

export default AboutFirstBanner;
