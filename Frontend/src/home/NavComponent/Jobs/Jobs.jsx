import Navbar from "@/layout/Navbar";
import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import SingleJob from "./SingleJob";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setAllJobs } from "@/public/jobslice";
import { motion } from "framer-motion";

function Jobs() {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery, locationFilter, roleFilter } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(allJobs);

  // Fetch and filter jobs whenever the filters change
  useEffect(() => {
    const filteredJobs = allJobs.filter((job) => {
      const matchesQuery =
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase());

      const matchesLocation =
        locationFilter.length === 0 || locationFilter.includes(job.location);

      const matchesRole =
        roleFilter.length === 0 || roleFilter.includes(job.title);

      return matchesQuery && matchesLocation && matchesRole;
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery, locationFilter, roleFilter]);

  // Fetch jobs from API
  const fetchJobs = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${JOB_API_END_POINT}/get/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          dispatch(setAllJobs(response.data.data));
        } else {
          console.error("API response is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  };

  // Initial fetch of jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Filter Panel */}
          <div className="w-full lg:w-1/5">
            <FilterCard />
          </div>

          {/* Job Listings */}
          {Array.isArray(filterJobs) && filterJobs.length > 0 ? (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }} // Initial state of the element (hidden and off to the right)
                    animate={{ opacity: 1, x: 0 }} // Animate to visible and in position
                    exit={{ opacity: 0, x: -100 }} // Animate out to the left when exiting
                    transition={{ duration: 0.3 }} // Duration of the animation
                    key={job?._id}
                  >
                    <SingleJob job={job} />
                  </motion.div>
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
