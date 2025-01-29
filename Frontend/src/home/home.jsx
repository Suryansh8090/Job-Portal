import React, { useEffect } from "react";
import Navbar from "../layout/Navbar";
import HeroSection from "./HeroSection";
// import CategoryCarousel from "./CategoryCarousel";
// import LatestJobs from "./Latestjobs";
import Footer from "@/layout/Footer";
import useGetAllJobs from "@/customhooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      
    </>
  );
}

export default Home;
