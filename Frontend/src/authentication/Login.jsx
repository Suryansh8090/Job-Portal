import React, { useState, useEffect } from "react";
import Img from "../assets/login.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/Layout/Navbar";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import USER_API_END_POINT from "../utils/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/public/authslice";
import { Loader2 } from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      if (res.data.success) {
        navigate("/");
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
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex h-screen ">
        {/* Right Side: Image */}
        <div
          className="hidden lg:flex w-1/3 rounded-full bg-cover bg-center ml-10 mb-5 mt-10"
          style={{
            backgroundImage: `url(${Img})`,
          }}
        ></div>

        {/* Left Side: Form */}
        <div className="flex flex-1 items-center justify-center p-6 bg-white mb-10 h-full mt-0">
          <div className="w-full max-w-md border border-gray-400 p-5 rounded-lg ml-7">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Login
            </h2>
            <p className="text-gray-500 text-center mt-2">
              Please enter your credentials
            </p>

            <form onSubmit={submitHandler} className="space-y-6 mt-6">
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
                  className="absolute top-1/2 right-2 transform -translate-y-1/6 flex items-center h-6 hover:text-blue-600"
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
              {/* Login Button */}

              {loading ? (
                <Button className="flex items-center justify-center w-full bg-blue-600 text-white hover:bg-blue-700">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Login
                </Button>
              )}
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Signup
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
