import AboutUs from "@/assets/aboutus.jpg.png";
import Img from "@/assets/main.jpg";
import manWoman from "@/assets/manWoman.png";
import { Button } from "@/components/ui/button";
import { setSearchedQuery } from "@/public/jobslice";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faHeartbeat, faLaptop, faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BarChart, Search } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CategoryCarousel from "./CategoryCarousel";





function HeroSection() {
  const { user } = useSelector((store) => store.auth);
  const isStudent = user?.role === "student";
  const isRecruiter = user?.role === "recruiter";

  // Inline FeatureCard component
  const FeatureCard = ({ title, description, icon, children }) => (
    <div className="bg-white p-10 mt-5 rounded-lg shadow-md max-w-sm mx-auto transform transition duration-300 hover:scale-110">
      <div className="mb-4">
        {/* Add Icon Logic */}
        <FontAwesomeIcon icon={icon} size="3x" className="text-indigo-600" />
      </div>
      <h4 className="text-2xl font-semibold text-gray-900">{title}</h4>
      <p className="mt-4 text-gray-600 ">{description}</p>
      {/* Render the children (the button) */}
      {children}
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
                Post jobs, review applications, and connect with top talent.
                Manage job listings and track candidates efficiently with your
                recruiter dashboard.
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
        <div className="py-20 bg-gradient-to-b from-indigo-50 to-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-4xl font-extrabold text-indigo-700 mb-4">
              Top Industries Hiring Now
            </h3>
            <p className="text-lg text-slate-800 max-w-2xl mx-auto mb-10">
              Discover the fastest-growing industries with high demand for
              talented professionals. Whether you're passionate about coding,
              saving lives, or managing finances—there's a place for you!
            </p>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 justify-items-center">
              <FeatureCard
                title="Technology"
                description="Join the digital revolution. The tech sector is thriving with roles for software developers, data analysts, and AI experts."
                icon={faLaptop}
              >
                <Link to="/jobs">
                  <Button className="bg-[#2253b7] text-sm text-white mt-6 mb-5 hover:bg-[#4b0f18] transition-all duration-300">
                    Explore Jobs
                  </Button>
                </Link>
              </FeatureCard>

              <FeatureCard
                title="Healthcare"
                description="Make an impact. Healthcare careers are in high demand—from nurses to biotech innovators, your skills save lives."
                icon={faHeartbeat}
              >
                <Link to="/jobs">
                  <Button className="bg-[#2253b7] text-sm text-white mt-6 mb-5 hover:bg-[#4b0f18] transition-all duration-300">
                    Explore Jobs
                  </Button>
                </Link>
              </FeatureCard>

              <FeatureCard
                title="Finance"
                description="Shape the economy. Financial analysts, accountants, and investment strategists are more essential than ever."
                icon={faMoneyBillTrendUp}
              >
                <Link to="/jobs">
                  <Button className="bg-[#2253b7] text-sm text-white mt-6 mb-5 hover:bg-[#4b0f18] transition-all duration-300">
                    Explore Jobs
                  </Button>
                </Link>
              </FeatureCard>
            </div>
          </div>
        </div>
      ) : null}

      {/* ======================= Why Choose Us Section ======================= */}
      <section className="bg-gradient-to-br from-indigo-50 to-white py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          {/* Heading */}
          <h2 className="text-4xl font-extrabold  text-indigo-700  mb-12 tracking-tight">
            {user ? "Thank You for Choosing Us!" : "Why Choose JobPortal?"}
          </h2>

          {/* Student View */}
          {isStudent && (
            <div className="grid gap-8 md:grid-cols-3 w-full max-w-5xl mx-auto">
              <FeatureCard
                title="Verified Opportunities"
                description="All job postings are screened and verified to protect your job search experience and ensure legitimacy."
                icon="check-circle"
              />
              <FeatureCard
                title="1-Click Apply"
                description="Apply for roles in seconds with streamlined application forms. No red tape—just results."
                icon="paper-plane"
              />
              <FeatureCard
                title="Expert Career Guidance"
                description="Access curated tips, resume tools, and interview prep tailored for students and freshers."
                icon="lightbulb"
              />
            </div>
          )}

          {/* Recruiter View */}
          {isRecruiter && (
            <div className="grid gap-8 md:grid-cols-3 w-full max-w-5xl mx-auto">
              <FeatureCard
                title="Qualified Talent Pool"
                description="Tap into a growing database of talented job seekers ready to meet your business needs."
                icon="users"
              />
              <FeatureCard
                title="All-in-One Hiring Tools"
                description="Post jobs, manage applications, and schedule interviews seamlessly—all in one place."
                icon="clipboard-check"
              />
              <FeatureCard
                title="Trusted & Verified Candidates"
                description="Every profile is authenticated with real data—ensuring you hire with confidence."
                icon="shield-check"
              />
            </div>
          )}

          {/* Guest View */}
          {!user && (
            <div className="grid gap-8 md:grid-cols-3 w-full max-w-5xl mx-auto">
              <FeatureCard
                title="Opportunities for Everyone"
                description="From entry-level jobs to experienced roles, find the right match for your goals."
                icon="briefcase"
              />
              <FeatureCard
                title="Build Employer Connections"
                description="Connect with top companies and take a step closer to your next big opportunity."
                icon="building"
              />
              <FeatureCard
                title="Create Your Free Profile"
                description="Sign up today to explore job listings or post openings and connect with talent."
                icon="user-plus"
                cta="Sign Up Now"
              />
            </div>
          )}
        </div>
      </section>

      {/* About Us Section */}

      {/* About Us Section */}
      <div id="aboutus" className="bg-indigo-50 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Text Content */}
          <div className="text-center md:text-left w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-indigo-700 mb-4">
              About Us
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>JobPortal</strong> bridges the gap between talented job
              seekers and leading employers. Whether you're a student exploring
              career paths or a recruiter searching for top talent, our platform
              offers a fast, reliable, and user-friendly way to connect. We aim
              to make the hiring process smooth, secure, and effective for
              everyone.
            </p>
          </div>

          {/* Rounded Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={AboutUs}
              alt="About Us"
              className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white"
            />
          </div>
        </div>
      </div>

      {/*  Footer  */}
      <div className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Social Icons */}
          <div className="flex justify-center gap-8 mb-4">
            <a
              href="#"
              className="transform transition duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                size="2x"
                className="text-white hover:text-blue-600"
              />
            </a>
            <a
              href="#"
              className="transform transition duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="2x"
                className="text-white hover:text-pink-500"
              />
            </a>
            <a
              href="#"
              className="transform transition duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                className="text-white hover:text-blue-400"
              />
            </a>
          </div>

          {/* Footer Text */}
          <div className="text-center text-white text-sm font-medium flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faCopyright} />
            <span className="tracking-wide">
              © {new Date().getFullYear()} JobPortal. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
