import React from "react";
import { useState } from "react";
import Img from "../assets/registration.jpg";
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

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
    profilePhoto: null
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, profilePhoto: file });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    dispatch(setLoading(true));
    const formData = new FormData(); //formdata object
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
      // If error.response exists, it means the error response came from the backend
      if (error.response) {
        console.log("Error Response:", error.response.data);
        const message = error.response.data.message || "An error occurred";
        toast.error(message); // Display error message to the user
      } else {
        // If no response (network error, etc.)
        console.log("Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      useDispatch(setLoading(false));
    }
    useEffect(() => {
      if (user) {
        navigate("/");
      }
    }, []);
  };
  return (
    <>
      <Navbar />

      <div className="flex min-h-screen ">
        {/* Left Side: Image */}
        <div
          className="hidden lg:flex w-1/3 rounded-full bg-cover bg-center ml-10 mb-10 mt-10"
          style={{
            backgroundImage: `url(${Img})`,
          }}
        ></div>
        <div className="flex flex-1 items-center justify-center p-6 bg-white ">
          <div className="w-full max-w-md border  border-gray-400 p-5 rounded-lg ml-7 mt-12  ">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Signup
            </h2>
            <p className="text-gray-500 text-center mt-2">
              Register your account
            </p>

            <form onSubmit={submitHandler} className="space-y-6 mt-6 ">
              {/* Fullname Input */}
              <div>
                <Label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  title="Email should be you@example.com"
                  placeholder="you@example.com"
                  className="mt-1 block w-full"
                  required
                />
              </div>
              {/* phoneNumber Input */}
              <div>
                <Label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  PhoneNumber
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  pattern="[0-9]{10}"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  title="Phone number should be 10 digits"
                  placeholder="Enter your Phone-Number"
                  className="mt-1 block w-full"
                  required
                />
              </div>

              {/* Role Input */}
              <div className="flex items-center gap-2 ">
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
                    <Label htmlFor="r1">Recruiter</Label>
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
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
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
                  className="absolute top-1/2 right-2 transform -translate-y-1/6 flex items-center  h-6 hover:text-blue-600"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.615a12.089 12.089 0 0116.04 0m-2.878 6.74a6.008 6.008 0 01-10.284 0m1.88-4.74a2.004 2.004 0 012.82 0m0 0a2.004 2.004 0 012.82 0m-2.82 0a2.004 2.004 0 012.82 0"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 12.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-2.625-4.62a6 6 0 117.174 7.917l.015-.018a6.003 6.003 0 01-7.19 0l.016.018a6 6 0 01-7.174-7.917"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* signup Button */}

              {loading ? (
                <Button
                  className="flex items-center justify-center w-full bg-blue-600 text-white hover:bg-blue-700"
                  disabled
                >
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
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
