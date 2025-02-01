import Navbar from "@/layout/Navbar";
import React, { useEffect } from "react";
import Job from "../Jobs/SingleJob";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/public/jobslice";
import useGetAllJobs from "@/customhooks/useGetAllJobs";
import { motion } from "framer-motion"; // Importing Framer Motion for animations

function Browse() {
  useGetAllJobs(); // Custom hook to fetch all jobs
  const { allJobs } = useSelector((store) => store.job); // Accessing jobs from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery("")); // Reset search query on component unmount
    };
  }, [dispatch]);

  // Check if allJobs is defined and is an array
  const jobCount = Array.isArray(allJobs) ? allJobs.length : 0;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4"> {/* Added padding for better mobile experience */}
        <h1 className="font-bold text-xl my-10">
          Search Results ({jobCount})
        </h1>
        
        {/* Grid layout with responsive design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Check if jobs exist */}
          {Array.isArray(allJobs) && allJobs.length > 0 ? (
            allJobs.map((job) => (
              <motion.div 
                key={job._id}
                initial={{ opacity: 0 }} // Initial state
                animate={{ opacity: 1 }} // Animation when the component is visible
                transition={{ duration: 0.5 }} // Smooth transition
              >
                <Job job={job} />
              </motion.div>
            ))
          ) : (
            <p>No jobs found.</p> // Display message if no jobs are found
          )}
        </div>
      </div>
    </>
  );
}

export default Browse;
