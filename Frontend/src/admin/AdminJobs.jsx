import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/layout/Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/public/jobslice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/customhooks/useGetAllAdminJobs";
import { motion } from "framer-motion"; // Importing Framer Motion

function AdminJobs() {
  // Custom hook to fetch all admin jobs
  useGetAllAdminJobs();
  
  const navigate = useNavigate();
  const [input, setInput] = useState(""); // State to store filter input text
  const dispatch = useDispatch();
  
  // Dispatch action to set search text
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <>
      <Navbar /> {/* Navbar component */}
      
      <motion.div
        className="max-w-6xl mx-auto my-10" // Container for the main content
        initial={{ opacity: 0 }} // Initial fade-in
        animate={{ opacity: 1 }} // Animate to full opacity
        exit={{ opacity: 0 }} // Fade-out on exit
        transition={{ duration: 0.5 }} // Transition duration
      >
        {/* Flex container for input and button */}
        <div className="flex items-center justify-between my-2">
          <Input
            className="w-full sm:w-72" // Responsively adjust width
            placeholder="Filter By Name and Role"
            onChange={(e) => setInput(e.target.value)} // Handle input change
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")} // Navigate to job creation page
            className="ml-4" // Margin to the left of the button
          >
            New Jobs
          </Button>
        </div>
        
        {/* Render AdminJobsTable component to display the job list */}
        <AdminJobsTable />
      </motion.div>
    </>
  );
}

export default AdminJobs;
