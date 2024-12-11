import { Badge } from "@/components/ui/badge";
import React from "react";

function LatestJobCard() {
  return (
    <>
      <div className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer">
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
        <div>
          <h1 className="font-bold text-lg my-2">JOb Title</h1>
          <p className="text-sm text-gray-600">Lorekjbjk jkkjb knknknkl jbjkbub </p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
            Position
          </Badge>
          <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
            Part Time
          </Badge>
          <Badge className={"text-[#7209B7] font-bold"} variant={"ghost"}>
            24LPA
          </Badge>
        </div>
      </div>
    </>
  );
}

export default LatestJobCard;
