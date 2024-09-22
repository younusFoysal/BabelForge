import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ButtonSmall from "../shared/Buttons/ButtonSmall";
import subimage1 from "@/image/Home/carousel/sub_service.avif";
import image1 from "@/image/Home/carousel/creative_card.avif";
import Image from "next/image";

const Carousels = () => {
  return (
    <div className="container mx-auto">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div
              className="relative cursor-pointer h-[350px] p-6 rounded-xl bg-primary bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${image1})` }}
            >
              <h2 className="font-semibold max-w-[150px] mb-2 text-3xl text-white">
                Engagement survey
              </h2>
              <Image
                className="max-h-[36px]"
                src={subimage1}
                alt=""
                height={600}
                width={400}
              />
              {/* Hover Item */}
              <div className="w-full pb-10 h-full opacity-0 hover:opacity-100 duration-500 top-0 left-0  rounded-xl absolute p-6 bg-[#000000cc]">
                <h4 className="text-[#c3c6d4] font-light text-[14px]">
                  Engagement survey
                </h4>
                <img className="max-h-[48px]" src={subimage1} alt="" />
                <ul className="text-[#c3c6d4] font-light text-[14px] py-6 space-y-2"></ul>
                <ButtonSmall color="primary" text="Get Started"></ButtonSmall>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="w-1/2 h-24 bg-orange-500 "> hello</div>
          </CarouselItem>
          <CarouselItem>
            <div className="w-1/2 h-24 bg-blue-500 "> hello</div>.
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Carousels;
