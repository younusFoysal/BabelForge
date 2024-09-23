import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { BsChatLeftText } from 'react-icons/bs';
const AboutCarousel = () => {
  return (
    <section className="my-[70px]">
      <h1 className="text-center mb-10">Our story</h1>
      <Carousel>
        <CarouselContent>
          <CarouselItem className="ml-5 py-12 text-center px-10 basis-1/3 border rounded-xl">
            <BsChatLeftText className="text-[50px] text-center block mb-4" />
            <p className="text-[#6161ff] mb-5 font-semibold text-3xl">Community Events</p>
          </CarouselItem>
          <CarouselItem className="ml-5 basis-1/3 border">...</CarouselItem>
          <CarouselItem className="ml-5 basis-1/3 border">...</CarouselItem>
          <CarouselItem className="ml-5 basis-1/3 border">...</CarouselItem>
          <CarouselItem className="ml-5 basis-1/3 border">...</CarouselItem>
          <CarouselItem className="ml-5 basis-1/3 border">...</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default AboutCarousel;
