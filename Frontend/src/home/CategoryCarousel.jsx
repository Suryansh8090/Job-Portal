import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Button } from '../components/ui/button';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

function CategoryCarousel() {

  
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-8 ">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                                <Button variant="outline" className=" bg-white  rounded-full border-none">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="bg-white text-black "  />
                <CarouselNext className="bg-white text-black " />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel