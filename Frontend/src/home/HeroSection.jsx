import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LatestJobs from "./LatestJobs";
import CategoryCarousel from "./CategoryCarousel";
import { setSearchedQuery } from "@/public/jobslice";

function HeroSection() {
  const { user } = useSelector((store) => store.auth);
  const isStudent = user?.role === "student";
  const isRecruiter = user?.role === "recruiter";

  // Inline FeatureCard component
  const FeatureCard = ({ title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
      <h4 className="text-2xl font-semibold text-gray-900">{title}</h4>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );

  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    console.log("Searching for:", query);
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 py-16 md:py-30">
        <div className="text-center text-white px-6">
          <div className="flex flex-col gap-5">
            <span className="px-6 py-2 rounded-full bg-[#F4F5F7] text-black font-semibold mx-auto text-sm sm:text-base lg:text-lg">
              Empowering Careers & Talent
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">
              {isStudent
                ? "Find Your Dream Job"
                : isRecruiter
                ? "Hire Top Talent"
                : "Transforming the Way the World Hires"}
              <br />
              {isStudent
                ? "Start Your Career Journey Today"
                : isRecruiter
                ? "Discover Exceptional Candidates"
                : "Find Your Dream Job or Perfect Candidate"}
            </h1>
            <p className="text-base sm:text-lg mt-4 mx-auto w-full sm:w-3/4 md:w-2/3 font-semibold text-gray-200">
              {isStudent
                ? "Explore job opportunities that match your skills and aspirations. Build your future with top employers."
                : isRecruiter
                ? "Connect with qualified candidates and make impactful hiring decisions."
                : "At JobPortal, we bridge the gap between talent and opportunity. Join the future of work with us."}
            </p>
          </div>

          {/* Job Search Input Section */}
          {isStudent && (
            <div className="flex w-full sm:w-[60%] mx-auto mt-12 shadow-lg border border-white rounded-full items-center gap-4">
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search for jobs or companies..."
                className="outline-none border-none w-full py-2 px-4 rounded-l-full text-black"
              />
              <Button
                onClick={searchJobHandler}
                className="rounded-r-full bg-[#6A38C2] text-white hover:bg-[#5b30a6] py-2 px-6"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {isStudent && <CategoryCarousel />}

        {/* Explore Jobs Section */}
        {isStudent && (
          <div className="text-center mt-16 text-white">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 py-2">
              Welcome, {user?.fullname}
            </h2>
            <p className="text-lg sm:text-xl font-semibold text-gray-200 mx-auto w-3/4 md:w-2/3">
              Browse thousands of job openings, create a professional profile,
              and kickstart your career.
            </p>

            <Link to="/jobs">
              <Button className="bg-[#F4F5F7] text-sm text-black mt-6 mb-5 hover:bg-[#ddd]">
                Explore Jobs
              </Button>
            </Link>
          </div>
        )}

        {/* Post Job Section */}
        {isRecruiter && (
          <div className="text-center text-white py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Welcome, {user?.fullname}
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mx-auto w-3/4 md:w-2/3">
              Find and hire top talent. Post jobs, review applications, and
              connect with skilled candidates.
            </p>
            <Link to="/admin/jobs">
              <Button className="bg-[#F4F5F7] text-[#6A38C2] mb-5 mt-5 hover:bg-[#ddd]">
                Post a Job
              </Button>
            </Link>
          </div>
        )}

        {/* Recruiter Dashboard Overview */}
        {isRecruiter ? (
          <div className="mt-2 text-center bg-white py-20">
            <h3 className="text-3xl font-bold text-indigo-600">
              Your Recruiter Dashboard
            </h3>
            <p className="text-lg text-black mx-auto w-3/4 md:w-2/3 mt-4">
              The {`${user.fullname}`} dashboard offers everything you need to
              manage your hiring process. From posting jobs to tracking
              applications and managing candidate profiles, everything is at
              your fingertips.
            </p>
          </div>
        ) : null}

        {/* Top Industries for Hiring */}
        {isStudent ? (
          <div className="py-16 bg-indigo-50">
            <h3 className="text-3xl font-bold text-indigo-600 text-center py-2">
              Top Industries Hiring Now
            </h3>
            <div className="flex gap-8 mx-auto w-3/4 flex-wrap mt-6 justify-center">
              <FeatureCard
                title="Technology"
                description="The tech industry is booming, and we're helping recruiters find software engineers, data scientists, and more."
              />
              <FeatureCard
                title="Healthcare"
                description="We have a wide pool of healthcare professionals looking for opportunities."
              />
              <FeatureCard
                title="Finance"
                description="Recruit top financial analysts, accountants, and more from the finance industry."
              />
            </div>
          </div>
        ) : null}

        {/* Why Choose Us Section */}
        <div className="bg-white py-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>

          {/* For Students */}
          {isStudent && (
            <div className="flex flex-wrap justify-center gap-8 mx-auto w-3/4 md:w-2/3">
              <FeatureCard
                title="Verified Jobs"
                description="We ensure that all job listings are from legitimate companies to keep your job search safe."
              />
              <FeatureCard
                title="Easy Application"
                description="Apply for jobs with just a few clicks. No lengthy processes, just career growth!"
              />
              <FeatureCard
                title="Career Guidance"
                description="Get expert advice and resources to help you land your dream job faster."
              />
            </div>
          )}

          {/* For Recruiters */}
          {isRecruiter && (
            <div className="flex flex-wrap justify-center gap-8 mx-auto w-3/4 md:w-2/3">
              <FeatureCard
                title="Find Top Talent"
                description="Access a pool of skilled professionals ready to join your team."
              />
              <FeatureCard
                title="Streamlined Hiring"
                description="Post jobs, review applications, and hire candidates efficiently."
              />
              <FeatureCard
                title="Trusted Candidates"
                description="Get access to verified profiles with complete work history and skills."
              />
            </div>
          )}

          {/* For Non-Logged-In Users */}
          {!user && (
            <div className="flex flex-wrap justify-center gap-8 mx-auto w-3/4 md:w-2/3">
              <FeatureCard
                title="For Job Seekers"
                description="Discover job opportunities that match your skills and career goals."
              />
              <FeatureCard
                title="For Employers"
                description="Connect with skilled professionals and make impactful hiring decisions."
              />
              <FeatureCard
                title="Join Us Today"
                description="Whether you’re hiring or job hunting, JobPortal is your gateway to success."
              />
            </div>
          )}
        </div>

        {/* About Us Section */}
        <div id="aboutus" className="py-16 text-center mt-1 bg-indigo-100">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-lg mx-auto w-3/4 md:w-2/3">
            JobPortal is a dynamic platform that connects job seekers with
            employers. We focus on providing an intuitive, secure, and efficient
            platform that helps individuals build their careers and
            organizations find the best talent.
          </p>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
