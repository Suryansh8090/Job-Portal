import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HeroSection() {
  const { user } = useSelector((store) => store.auth);
  const isStudent = user?.role === "student";
  return (
    <>
      <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 py-16">
        {/* Hero Section Content */}
        <div className="text-center text-white">
          <div className="flex flex-col gap-5 my-8">
            <span className="px-6 py-2 rounded-full bg-[#F4F5F7] text-[#6A38C2] font-semibold mx-auto">
              Empowering Careers & Talent
            </span>
            <h1 className="text-5xl font-extrabold tracking-wide">
              Transforming the Way the World Hires
              <br />
              Find Your Dream Job or Perfect Candidate
            </h1>
            <p className="text-lg mt-4 mx-auto w-3/4 md:w-2/3 text-gray-200">
              At [Company Name], we bridge the gap between exceptional talent
              and leading employers. We provide job seekers with opportunities
              that align with their skills, and companies with top-tier talent
              ready to make an impact. Join the future of work with us.
            </p>
          </div>

          {/* Job Search Input Section */}
          <div className="flex w-[60%] mx-auto mt-12 shadow-lg border border-white rounded-full items-center gap-4">
            <input
              type="text"
              placeholder="Search for jobs, skills, or companies..."
              className="outline-none border-none w-full py-2 px-4 rounded-l-full text-black"
            />
            <Button className="rounded-r-full bg-[#6A38C2] text-white hover:bg-[#5b30a6] py-2 px-6">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* About Us Section */}
        <div className="text-center mt-16 text-white" id="aboutUs">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-200 mx-auto w-3/4 md:w-2/3">
            We are revolutionizing the recruitment industry by creating a
            platform where innovation, efficiency, and trust converge. Our
            mission is simple: to empower job seekers and companies to thrive in
            an ever-changing job market. Whether you’re looking to build your
            dream career or find the best talent for your organization, we’re
            here to help you succeed.
          </p>

          <div className="mt-8">
            <Link to="/about">
              <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6] px-8 py-3 text-xl">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white py-16">
          <div className="text-center mx-auto w-3/4 md:w-2/3">
            <h2 className="text-3xl font-bold mb-6 text-[#6A38C2]">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our platform offers a seamless experience for both job seekers and
              employers. Whether you’re looking for the perfect candidate or
              your next dream job, our simple, step-by-step process ensures you
              get the best results.
            </p>

            <div className="flex justify-around gap-8 mt-12">
              <div className="w-1/3 p-6 text-center bg-gray-50 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-[#6A38C2]">
                  For Job Seekers
                </h3>
                <ul className="text-lg text-gray-600 mt-4">
                  <li>Browse thousands of job opportunities</li>
                  <li>Tailor your resume to attract top employers</li>
                  <li>Apply and get notifications of new opportunities</li>
                </ul>
              </div>
              <div className="w-1/3 p-6 text-center bg-gray-50 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-[#6A38C2]">
                  For Employers
                </h3>
                <ul className="text-lg text-gray-600 mt-4">
                  <li>Post job listings easily and quickly</li>
                  <li>Access a pool of pre-screened top talent</li>
                  <li>Collaborate with candidates to find the perfect match</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gradient-to-r from-[#F4F5F7] to-[#E9ECEF] py-16">
          <div className="text-center mx-auto w-3/4 md:w-2/3">
            <h2 className="text-3xl font-bold text-[#6A38C2] mb-6">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Don’t just take our word for it! Here’s what some of our satisfied
              users have to say about their experience with us.
            </p>

            <div className="flex justify-center gap-8">
              <div className="w-1/3 p-6 text-center bg-white rounded-lg shadow-lg">
                <p className="text-lg text-gray-600 mb-4">
                  “This platform made my job search so much easier. I found a
                  great job within a month!”
                </p>
                <p className="font-semibold text-[#6A38C2]">
                  John D., Software Developer
                </p>
              </div>
              <div className="w-1/3 p-6 text-center bg-white rounded-lg shadow-lg">
                <p className="text-lg text-gray-600 mb-4">
                  “We were able to hire top-tier talent for our startup in
                  record time.”
                </p>
                <p className="font-semibold text-[#6A38C2]">
                  Sara L., Hiring Manager
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action - Ready to Start? Section */}
        {/* Conditionally render this section based on the user's login status */}
        {!user && (
          <div className="text-center mt-16 text-white">
            <h3 className="text-3xl font-semibold mb-4">Ready to Start?</h3>
            <p className="text-lg text-gray-200 mb-8">
              Whether you're a job seeker or an employer, take the next step
              towards success. We’re here to help you find the perfect match.
            </p>
            <Link to="/signup">
              <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] mt-6">
                Get Started Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default HeroSection;
