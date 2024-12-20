import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/layout/Navbar";
import React from "react";

function JobsDescription() {
  const isApplied = false;
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between ">
          <div>
            <h1 className="font-bold text-xl">Frontend Developer</h1>
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
          <div>
            <Button
              disabled={isApplied}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed text-white"
                  : "bg-[#9cd6f1] hover:bg-[#2d75cd] text-black"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-semibold py-4">
          Job Description
        </h1>
        <div className="my-4" >
          <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
          <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">Banglore</span></h1>
          <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">Frontend Developer dfsfg sfd sdfgg sd </span></h1>
          <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">2 yrs</span></h1>
          <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">12 LPA</span></h1>
          <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">40</span></h1>
          <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">17-01-2025</span></h1>
        </div>
      </div>
    </>
  );
}

export default JobsDescription;
