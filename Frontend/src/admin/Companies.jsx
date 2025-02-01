import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/layout/Navbar";
import React, { useEffect, useState } from "react";
import PositionTable from "./PositionTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/customhooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/public/companyslice";
import { motion } from "framer-motion"; // Importing Framer Motion

function Companies() {
  const navigate = useNavigate(); // Hook to navigate between pages

  // Custom hook to fetch all companies
  useGetAllCompanies();

  const [input, setInput] = useState(""); // State to hold the search query for filtering companies
  const dispatch = useDispatch();

  // Dispatch the search query whenever the input changes
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <>
      <Navbar /> {/* Navbar component */}
      
      {/* Animated container for smooth transitions */}
      <motion.div
        className="max-w-6xl mx-auto my-10" // Container with max width and margins for centering
        initial={{ opacity: 0 }} // Initial state for fade-in effect
        animate={{ opacity: 1 }} // Animate to full opacity
        exit={{ opacity: 0 }} // Fade-out on exit
        transition={{ duration: 0.5 }} // Transition duration for fade effect
      >
        {/* Flex container for input and button, responsive layout */}
        <div className="flex items-center justify-between my-2">
          <Input
            className="w-full sm:w-72" // Full width on small screens and fixed width on larger screens
            placeholder="Filter By Name"
            onChange={(e) => setInput(e.target.value)} // Update the input state
          />
          <Button
            onClick={() => navigate("/admin/companies/create")} // Navigate to the create company page
            className="ml-4" // Margin to the left for spacing between input and button
          >
            New Vacancy
          </Button>
        </div>

        {/* Render PositionTable to display the company job positions */}
        <PositionTable />
      </motion.div>
    </>
  );
}

export default Companies;
