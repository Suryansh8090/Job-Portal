import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/public/authslice";
import USER_API_END_POINT from "@/utils/constant";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null)); // Reset user data
        navigate("/"); // Redirect to home
        toast.success(res.data.message); // Show success message
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed"); // Show error message if logout fails
    }
  };

  return (
    <div className="bg-[rgba(224,221,221,0.08)]">
      <div className="flex items-center justify-between max-w-7xl h-16 mx-auto p-4 sm:p-0">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-500">Portal</span>
          </h1>
        </div>

        {/* Menu for desktop */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-6 font-medium cursor-pointer">
            <li>
              <Link to="/">Home</Link>
            </li>

            {!user ? (
              <></>
            ) : user.role === "student" ? (
              <>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            ) : user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/companies">Companies</Link>
                </li>
              </>
            ) : null}
          </ul>

          {/* Authentication Buttons */}
          {!user ? (
            <div className="flex gap-1">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "/default-avatar.jpg"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-1">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "/default-avatar.jpg"}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-1 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-1 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                  {user.role === "recruiter" && (
                    <div className="flex w-fit items-center gap-1 cursor-pointer">
                      <Button variant="link">
                        <Link to="/admin/jobs/create">Post a Job</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            className="text-2xl"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className=" bg-gray-800 text-white p-4">
          <ul className="flex flex-col gap-6">
            <li>
              <Link to="/">Home</Link>
            </li>

            {!user ? (
              <></>
            ) : user.role === "student" ? (
              <>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            ) : user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/companies">Companies</Link>
                </li>
              </>
            ) : null}

            {/* Always visible Authentication Buttons */}
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full text-black">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "/default-avatar.jpg"}
                    />
                  </Avatar>
                  <h4>{user?.fullname}</h4>
                </div>
                <Button
                  onClick={logoutHandler}
                  variant="outline"
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
