import Navbar from "@/layout/Navbar";
import React, { useEffect } from "react";
import FilterCard from "./FilterCard";
import SingleJob from "./SingleJob";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setAllJobs } from "@/public/jobslice";

function Jobs() {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);

 

  useEffect(() => {
    const token = localStorage.getItem("token"); // Or get it from Redux store
    axios
      .get(`${JOB_API_END_POINT}/get/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      })
      .then((response) => {
        // Log the response data to check the structure
       // console.log("Response Data:", response.data);
        if (Array.isArray(response.data.data)) {
          dispatch(setAllJobs(response.data.data)); // Dispatch the data to Redux store
        } else {
          console.error("API response is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error); // Handle errors
      });
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {/* Check if allJobs is an array and has items */}
          {Array.isArray(allJobs) && allJobs.length > 0 ? (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <div key={job?._id}>
                    <SingleJob job={job} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <span className="font-bold text-2xl ml-[30%] my-5">
              No Jobs Available!
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Jobs;
