import React, { useState, useEffect } from "react";
import Img from "../assets/registration.jpg";  // Image for background
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/Layout/Navbar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import USER_API_END_POINT from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/public/authslice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";  // Importing framer-motion for animations

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    profilePhoto: null
  });

  // Change event handler for form fields
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // File upload handler
  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, profilePhoto: file });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  // Submit handler for form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        },
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message || "An error occurred";
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      dispatch(setLoading(false));
    }

    useEffect(() => {
      if (user) {
        navigate("/");
      }
    }, [user, navigate]);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Left Side: Image */}
        <motion.div
          className="hidden lg:flex w-full lg:w-1/3 bg-cover bg-center ml-10 mb-10 mt-10 rounded-xl"
          style={{ backgroundImage: `url(${Img})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        ></motion.div>

        {/* Right Side: Form */}
        <div className="flex flex-1 items-center justify-center p-6 bg-white">
          <div className="w-full max-w-md border border-gray-400 p-5 rounded-lg mt-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Signup</h2>
            <p className="text-gray-500 text-center mt-2">Register your account</p>

            <form onSubmit={submitHandler} className="space-y-6 mt-6">
              {/* Fullname Input */}
              <div>
                <Label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                  Fullname
                </Label>
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  id="fullname"
                  placeholder="Enter your Fullname"
                  className="mt-1 block w-full"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="you@example.com"
                  className="mt-1 block w-full"
                  required
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  pattern="[0-9]{10}"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="Enter your Phone-Number"
                  className="mt-1 block w-full"
                  required
                />
              </div>

              {/* Role Input */}
              <div className="flex items-center gap-2">
                <h1 className="mb-1">Role:</h1>
                <RadioGroup defaultValue="comfortable" className="flex">
                  <div className="flex items-center space-x-1">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="r1">Student</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="r2">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Profile Input */}
              <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={fileHandler}
                  className="cursor-pointer"
                  name="profilePhoto"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Enter your password"
                  className="mt-1 block w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-2 transform -translate-y-1/6 flex items-center h-6 hover:text-blue-600"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                      <path d="M3.98 8.615a12.089 12.089 0 0116.04 0" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                      <path d="M15.75 12.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-2.625-4.62a6 6 0 117.174 7.917l.015-.018a6.003 6.003 0 01-7.19 0l.016.018a6 6 0 01-7.174-7.917" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Submit Button */}
              {loading ? (
                <Button className="flex items-center justify-center w-full bg-blue-600 text-white hover:bg-blue-700" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Signup
                </Button>
              )}
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
