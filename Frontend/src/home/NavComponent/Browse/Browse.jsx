import Navbar from "@/layout/Navbar";
import React from "react";
import Job from "../Jobs/SingleJob"


function Browse() {
  const randomJobs = [1, 2, 3, 4];
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 ">
        <h1 className="font-bold text-xl my-10">Search Results ({randomJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4">

        {randomJobs.map((item, index) => <Job/>)}
        </div>
      </div>
    </>
  );
}

export default Browse;
