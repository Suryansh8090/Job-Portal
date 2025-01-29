import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LatestJobs from "./LatestJobs";
import CategoryCarousel from "./CategoryCarousel";

// Reusable FeatureCard Component
const FeatureCard = ({ title, description }) => (
  <div className="w-72 p-6 bg-gray-100 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-indigo-700">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

function HeroSection() {
  const { user } = useSelector((store) => store.auth);
  const isStudent = user?.role === "student";
  const isRecruiter = user?.role === "recruiter";

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 mt-2">
        <div className="text-center text-white py-10">
          <div className="flex flex-col gap-5 my-8">
            <span className="px-6 py-2 rounded-full bg-[#F4F5F7] text-black font-semibold mx-auto">
              Empowering Careers & Talent
            </span>
            <h1 className="text-5xl font-extrabold tracking-wide">
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
            <p className="text-lg mt-4 mx-auto w-3/4 md:w-2/3 font-semibold text-gray-200">
              {isStudent
                ? "Explore job opportunities that match your skills and aspirations. Build your future with top employers."
                : isRecruiter
                ? "Connect with qualified candidates and make impactful hiring decisions."
                : "At JobPortal, we bridge the gap between talent and opportunity. Join the future of work with us."}
            </p>
          </div>

          {/* Job Search Input Section */}
          {isStudent && (
            <div className="flex w-[60%] mx-auto mt-12 shadow-lg border border-white rounded-full items-center gap-4">
              <input
                type="text"
                placeholder="Search for jobs or companies..."
                className="outline-none border-none w-full py-2 px-4 rounded-l-full text-black"
              />
              <Button className="rounded-r-full bg-[#6A38C2] text-white hover:bg-[#5b30a6] py-2 px-6">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {isStudent && <CategoryCarousel />}

        {/* Explore Jobs Section */}
        {isStudent && (
          <div className="text-center mt-16 text-white">
            <p className="text-lg font-semibold text-gray-200 mx-auto w-3/4 md:w-2/3">
              Browse thousands of job openings, create a professional profile,
              and kickstart your career.
            </p>
            <Link to="/jobs">
              <Button className="bg-[#F4F5F7]  text-sm text-black mt-6 hover:bg-[#ddd]">
                Explore Jobs
              </Button>
            </Link>
          </div>
        )}

        <div>{isStudent ? <LatestJobs /> : null}</div>

        {/* Post Job Section */}
        {isRecruiter && (
          <div className="text-center  text-white">
            <h2 className="text-4xl font-bold mb-4">
              {" "}
              Welcome, {user?.fullname}
            </h2>
            <p className="text-lg text-gray-200 mx-auto w-3/4 md:w-2/3">
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
              The recruiter dashboard offers everything you need to manage your
              hiring process. From posting jobs to tracking applications and
              managing candidate profiles, everything is at your fingertips.
            </p>
          </div>
        ) : null}
        {/* Top Industries for Hiring */}

        {isRecruiter ? (
          <div className=" py-16">
            <h3 className="text-3xl font-bold text-white text-center py-2">
              Top Industries Hiring Now
            </h3>
            <div className="flex gap-12 mx-auto w-3/4 flex-wrap mt-6 text-center font-semibold">
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
          <h2 className="text-4xl font-bold text-indigo-600 mb-6">
            Why Choose Us?
          </h2>

          {/* For Students */}
          {isStudent && (
            <div className="flex justify-center gap-12 mx-auto w-3/4 flex-wrap">
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
            <div className="flex justify-center gap-12 mx-auto w-3/4 flex-wrap">
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
            <div className="flex justify-center gap-12 mx-auto w-3/4 flex-wrap">
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
        <div id="aboutus" className=" py-16 text-center mt-1">
          <h2
            className={`text-4xl font-bold mb-6 ${
              isRecruiter ? "text-white" : !user ? "text-white " : "text-white"
            }`}
          >
            About Us
          </h2>

          {/* About Us for Non-Logged-In Users */}
          {!user && (
            <p className="text-lg text-white w-3/4 mx-auto">
              <strong>JobPortal</strong> is a trusted platform that connects
              talented individuals with leading companies worldwide. Whether
              you're looking for your **next career opportunity** or searching
              for **top talent**, we provide a **seamless hiring experience**.
              Join us today and take your career or hiring process to the next
              level.
            </p>
          )}

          {/* About Us for Students */}
          {isStudent && (
            <p className="text-lg text-white w-3/4 mx-auto">
              <strong>JobPortal</strong> is designed to help **students and
              fresh graduates** launch their careers. We provide access to
              **verified job listings**, **internships**, and **career-building
              resources** to ensure you find the perfect job that matches your
              skills and aspirations.
            </p>
          )}

          {/* About Us for Recruiters */}
          {isRecruiter && (
            <p className="text-lg text-white w-3/4 mx-auto">
              <strong>JobPortal</strong> is the go-to platform for recruiters
              looking to hire top talent. Our efficient hiring solutions allow
              you to connect with skilled professionals, post job listings, and
              make informed hiring decisions with ease.
            </p>
          )}
        </div>

        {/* Statistics Section for non login user */}
        {isRecruiter ? null : (
          <div className="bg-white text-center  py-16">
            <div>
              <h2 className="text-3xl font-bold text-indigo-600 mb-10">
                Our Impact
              </h2>
              <div className="flex justify-center gap-24 mx-auto w-3/4 py-5 bg-gray-200 rounded-lg ">
                <div className="w-1/3">
                  <h3 className="text-4xl font-bold text-indigo-600">50+</h3>
                  <p className="text-gray-600">Successful Hires</p>
                </div>
                <div className="w-1/3">
                  <h3 className="text-4xl font-bold text-indigo-600">2,00+</h3>
                  <p className="text-gray-600">Companies Hiring</p>
                </div>
                <div className="w-1/3">
                  <h3 className="text-4xl font-bold text-indigo-600">
                    15 Days
                  </h3>
                  <p className="text-gray-600">Average Time to Hire</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Section */}

        <div className="bg-gray-200">
          <div className=" mx-auto ">
            <div className="grid grid-cols-2 py-10 text-center">
              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
                <p className="mb-2">Email: support@jobportal.com</p>
                <p className="mb-2">Phone: (123) 456-7890</p>
                <p className="mb-2">
                  Address: 123 Career Lane, Talent City, 12345
                </p>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-x-0 gap-y-1">
                  <Link
                    to="https://www.facebook.com"
                    target="_blank"
                    className="text-black hover:text-indigo-400 "
                  >
                    <i className="fab fa-facebook-f m-0 px-0"></i> Facebook
                  </Link>
                  <Link
                    to="https://www.twitter.com"
                    target="_blank"
                    className="text-black hover:text-indigo-400 m-0 px-0"
                  >
                    <i className="fab fa-twitter"></i> Twitter
                  </Link>
                  <Link
                    to="https://www.linkedin.com"
                    target="_blank"
                    className="text-black hover:text-indigo-400 m-0 px-0"
                  >
                    <i className="fab fa-linkedin-in"></i> LinkedIn
                  </Link>
                  <Link
                    to="https://www.instagram.com"
                    target="_blank"
                    className="text-black hover:text-indigo-400 m-0 px-0"
                  >
                    <i className="fab fa-instagram"></i> Instagram
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="text-center font-bold text-black">
              <p>&copy; 2025 JobPortal. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
