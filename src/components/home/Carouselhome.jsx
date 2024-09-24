import React from 'react';
import {Carousel,CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

const Carouselhome = () => {
    return (
        <div>
          ok
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <div className="w-1/2 h-24 bg-orange-500 "> hello</div>
              </CarouselItem>
              <CarouselItem>
                <div className="w-1/2 h-24 bg-orange-500 "> hello</div>
              </CarouselItem>
              <CarouselItem>
                <div className="w-1/2 h-24 bg-blue-500 "> hello</div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
    );
};

export default Carouselhome;