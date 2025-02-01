import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";

function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);

  // Ensure allJobs is an array before trying to use it
  const jobCount = Array.isArray(allJobs) ? allJobs.length : 0;

  return (
    <>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="text-4xl font-bold text-center text-white">
          <span className="text-white">Latest & Top</span> Job Openings
        </h1>
        <div className="grid grid-cols-3 gap-4 my-5">
          {jobCount <= 0 ? (
            <span>No Job Available</span>
          ) : (
            allJobs
              ?.slice(0, 3)
              .map((job) => <LatestJobCard key={job._id} job={job} />)
          )}
        </div>
      </div>
    </>
  );
}

export default LatestJobs;
