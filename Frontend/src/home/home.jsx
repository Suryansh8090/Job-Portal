import React from "react";
import Navbar from "../layout/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./Latestjobs";
import Footer from "@/layout/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </>
  );
}

export default Home;
