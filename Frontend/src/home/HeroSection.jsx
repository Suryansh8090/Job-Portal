import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryCarousel from "./CategoryCarousel";
import { setSearchedQuery } from "@/public/jobslice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import Img from "@/assets/main.jpg";
import AboutUs from "@/assets/aboutus.jpg.png";
import manWoman from "@/assets/manWoman.png";

function HeroSection() {
  const { user } = useSelector((store) => store.auth);
  const isStudent = user?.role === "student";
  const isRecruiter = user?.role === "recruiter";

  // Inline FeatureCard component
  const FeatureCard = ({ title, description }) => (
    <div className="bg-white p-10 mt-5 rounded-lg shadow-md max-w-sm mx-auto transform transition duration-300 hover:scale-110">
      <h4 className="text-2xl font-semibold text-gray-900">{title}</h4>
      <p className="mt-4 text-gray-600 ">{description}</p>
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
              Empowering Careers & Talent!
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
      </div>

      {/* Non-logged in User Section */}
      {!user && (
        <div className=" text-center   bg-indigo-50  ">
          <div className="bg-gradient-to-r  from-indigo-100 via-indigo-200 to-indigo-300">
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center w-full text-center">
                <h1 className="text-3xl font-bold mt-12">
                  Looking for your dream job or talent? <br /> Start your
                  journey with us.
                </h1>
                <p className="mt-4 text-lg font-semibold text-gray-700 ">
                  Sign up to explore amazing job opportunities and talents
                  tailored just for you!
                </p>
                <Link to="/signup">
                  <Button className="bg-[#F4F5F7] text-sm text-black mt-10 mb-5 hover:bg-[#bed3e4]">
                    Get Started
                  </Button>
                           
                </Link>
              </div>
              {/* Wrap both the text and image in a column flex layout */}
              <div>
                <img src={manWoman} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Job Section */}
      {isRecruiter && (
        <div className="bg-gradient-to-r  py-2 from-indigo-100 via-indigo-200 to-indigo-300">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center w-full text-center">
              <h1 className="text-4xl font-bold mt-2">
                Welcome, {user?.fullname}
              </h1>{" "}
              <p className="mt-12 text-lg font-semibold text-gray-700">
              Post jobs, review applications, and connect with top talent. Manage job listings and track candidates efficiently with your recruiter dashboard.
              </p>
             <div className="flex gap-10 justify-center mt-8">
             <Link to="/admin/jobs">
                <Button className="bg-[#F4F5F7]  text-sm text-black mt-6 mb-5 hover:bg-[#bed3e4]">
                  Post a Job
                </Button>
              </Link>   
             </div>
            </div>
            <div className="flex flex-col  items-end pr-2">
              <img src={Img} className="rounded-full w-full h-1/2" />
            </div>
          </div>
        </div>
      )}

      

      {/* Explore Jobs Student */}
      {isStudent ? (
        <div className="bg-gradient-to-r  py-2 from-indigo-100 via-indigo-200 to-indigo-300">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center w-full text-center">
              <h1 className="text-xl font-bold mt-2">
                Millions Of Jobs. <br /> Find The One That{" "}
                <span className="text-blue-400">Suits You.</span>
              </h1>{" "}
              <p className="mt-2 text-lg font-semibold text-gray-700">
                We have opportunities across diverse industries, <br /> helping
                you unlock your potential and build your future.
              </p>
              <Link to="/jobs">
                <Button className="bg-[#F4F5F7] text-sm text-black mt-6 mb-5 hover:bg-[#bed3e4]">
                  Explore Jobs
                </Button>
              </Link>
            </div>
            {/* Wrap both the text and image in a column flex layout */}
            <div className="flex flex-col  items-end pr-2">
              <img src={Img} className="rounded-full w-full h-1/2" />
            </div>
          </div>
        </div>
      ) : null}

      {/* Top Industries for Hiring */}
      {isStudent ? (
        <div className="py-16 bg-indigo-50" style={{}}>
          <h3 className="text-3xl font-bold text-indigo-600 text-center py-2">
            Top Industries Hiring Now
          </h3>
          <div className="flex gap-8 mx-auto w-3/4 flex-wrap mt-6 justify-center text-center">
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
      <div className="bg-indigo-50 py-10 text-center">
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
      <div id="aboutus" className=" text-center  bg-indigo-50  ">
        <div className="bg-gradient-to-r  py-2 from-indigo-100 via-indigo-200 to-indigo-300">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center w-full text-center">
              <h1 className="text-4xl font-bold">About Us</h1>{" "}
              <p className="text-lg sm:text-xl mx-auto w-4/5 md:w-3/4 lg:w-2/3 text-gray-700 leading-relaxed pb-10 mt-10">
                JobPortal connects job seekers with employers, providing a
                seamless experience for finding career opportunities and
                discovering top talent. Our mission is to simplify the job
                search and hiring process with an intuitive, secure, and
                efficient platform for students and companies
              </p>
            </div>
            {/* Wrap both the text and image in a column flex layout */}
            <div>
              <img src={AboutUs} />
            </div>
          </div>
        </div>
      </div>

      {/*  Footer  */}

      <div className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500">
        <div className="text-center pt-8 pb-4 flex justify-center gap-10">
          <div className="transform transition duration-300 hover:scale-110">
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              className="text-white hover:text-blue-500"
            />
          </div>
          <div className="transform transition duration-300 hover:scale-110">
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              className="text-white hover:text-pink-500"
            />
          </div>
          <div className="transform transition duration-300 hover:scale-110">
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              className="text-white hover:text-blue-400"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-center items-center gap-2 text-black pb-2">
          <FontAwesomeIcon icon={faCopyright} />
          <h1 className="text-sm font-semibold">All Rights Reserved</h1>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
