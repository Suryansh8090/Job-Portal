import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { setUser } from "@/public/authslice";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import USER_API_END_POINT from "@/utils/constant";

function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth); // Get user data from Redux store

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || [],
    file: user?.profile?.resume || null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (e.target.name === "profileImage") {
      setInput({ ...input, profileImage: file }); // Update profile image
    } else if (e.target.name === "file") {
      setInput({ ...input, file }); // Update resume file
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token is missing. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.profileImage) {
      formData.append("profileImage", input.profileImage); // Append profile image
    }
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true); // Show loading state
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,  // Replace with your actual API URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.data)); // Update user in Redux store with the response data
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Reset loading state
      setOpen(false); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {/* Full name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                id="fullname"
                className="col-span-3"
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                id="email"
                className="col-span-3"
              />
            </div>

            {/* Phone Number */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                id="phoneNumber"
                className="col-span-3"
              />
            </div>

            {/* Bio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio">Bio</Label>
              <Input
                type="text"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                id="bio"
                className="col-span-3"
              />
            </div>

            {/* Skills */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills">Skills</Label>
              <Input
                type="text"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                id="skills"
                className="col-span-3"
              />
            </div>

            {/* Profile Image */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                type="file"
                onChange={fileChangeHandler}
                id="profileImage"
                className="col-span-3"
              />
            </div>

            {/* File Upload */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file">Resume</Label>
              <Input type="file" onChange={fileChangeHandler} id="file" className="col-span-3" />
            </div>

            {/* Submit Button */}
            <DialogFooter>
              {loading ? (
                <Button className="flex items-center justify-center w-full bg-blue-600 text-white hover:bg-blue-700">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileDialog;
