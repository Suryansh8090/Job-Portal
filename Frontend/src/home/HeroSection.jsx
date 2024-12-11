import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-8 ">
          <span className="px-4 py-2 rounded-full bg-gray-50 text-[#F83002] font-medium mx-auto">
            Find Your Perfect Job or Talent
          </span>
          <h1 className="text-5xl font-bold">
            Search, Apply & <br /> Get Your{" "}
            <span className="text-[#6A38C2]">Perfect Jobs and Talent</span>{" "}
          </h1>
          <p>
            lorem jkuvu jbbjkfb mnbjkbfkjszd mnbjkbfiusz ,mbksfduk jbkjbsfkd
          </p>
        </div>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder=" find your ddream job"
            className="outline-none border-none w-full"
          />
          <Button className="rounded-r-full bg-gray-500">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
