'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { BsChatLeftText } from 'react-icons/bs';
import { useEffect, useState } from 'react';
const AboutCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const customCarousel = {
    opacity: '100',
    boxShadow: '0px 0px 24px rgba(0,0,0,.101025)',
  };

  return (
    <section className="my-[90px] max-w-[900px] mx-auto overflow-hidden">
      <h1 className="text-center mb-8 text-4xl font-semibold">Our story</h1>
      <Carousel
        setApi={setApi}
        className="w-full  mx-auto px-4 md:px-0 "
        opts={{
          loop: true,
          align: 'center',
        }}
      >
        <CarouselContent className="py-9">
          <CarouselItem
            style={current === 1 ? customCarousel : {}}
            className="ml-4 md:ml-[90px] opacity-20  py-12 text-center  px-10 md:basis-1/2   rounded-xl"
          >
            <BsChatLeftText className="text-[50px] mx-auto block mb-4" />
            <p className="text-[#6161ff] mb-5 font-semibold text-3xl">Community Events</p>
            <p className="text-xl mb-4">
              We have launched a new series of events for our community , including live sessions with monday.com product managers. These
              sessions are an opportunity for our community to connect directly with the team behind the features that they are using every
              day.
            </p>
            <p className="font-semibold text-[18px]"> April 2024</p>
          </CarouselItem>
          <CarouselItem
            style={current === 2 ? customCarousel : {}}
            className=" ml-4 md:ml-[90px] opacity-20  py-12 text-center px-10 md:basis-1/2   rounded-xl"
          >
            <BsChatLeftText className="text-[50px] mx-auto block mb-4" />
            <p className="text-[#6161ff] mb-5 font-semibold text-3xl">Community Events</p>
            <p className="text-xl mb-4">
              We have launched a new series of events for our community , including live sessions with monday.com product managers. These
              sessions are an opportunity for our community to connect directly with the team behind the features that they are using every
              day.
            </p>
            <p className="font-semibold text-[18px]"> April 2024</p>
          </CarouselItem>
          <CarouselItem
            style={current === 3 ? customCarousel : {}}
            className=" ml-4 md:ml-[90px] opacity-20  py-12 text-center px-10 md:basis-1/2   rounded-xl"
          >
            <BsChatLeftText className="text-[50px] mx-auto block mb-4" />
            <p className="text-[#6161ff] mb-5 font-semibold text-3xl">Community Events</p>
            <p className="text-xl mb-4">
              We have launched a new series of events for our community , including live sessions with monday.com product managers. These
              sessions are an opportunity for our community to connect directly with the team behind the features that they are using every
              day.
            </p>
            <p className="font-semibold text-[18px]"> April 2024</p>
          </CarouselItem>
          <CarouselItem
            style={current === 4 ? customCarousel : {}}
            className=" ml-4 md:ml-[90px] opacity-20  py-12 text-center px-10 md:basis-1/2   rounded-xl"
          >
            <BsChatLeftText className="text-[50px] mx-auto block mb-4" />
            <p className="text-[#6161ff] mb-5 font-semibold text-3xl">Community Events</p>
            <p className="text-xl mb-4">
              We have launched a new series of events for our community , including live sessions with monday.com product managers. These
              sessions are an opportunity for our community to connect directly with the team behind the features that they are using every
              day.
            </p>
            <p className="font-semibold text-[18px]"> April 2024</p>
          </CarouselItem>
        </CarouselContent>
        {/* Carousel BTN */}
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </section>
  );
};

export default AboutCarousel;
