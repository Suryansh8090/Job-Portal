import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Button } from "../components/ui/button";
import { setSearchedQuery } from "@/public/jobslice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query)); // Store the query in the Redux store
    navigate("/browse"); // Navigate to the browse page
  };

  return (
    <div className="my-8 px-4">
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center px-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="bg-white text-black border border-gray-300 rounded-full py-2 px-4 hover:bg-gray-100 transition-colors duration-300 w-full sm:w-auto"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-between">
          <CarouselPrevious className="bg-white text-black p-2 rounded-full" />
          <CarouselNext className="bg-white text-black p-2 rounded-full" />
        </div>
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
