import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { setUser } from "@/public/authslice";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
    skills: user?.profile?.skills.join(", ") || "",
    file: user?.profile?.resume || null,
    profilePhoto: user?.profile?.profilePhoto || null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    //   console.log("Selected file:", file); // Debugging the selected file

    if (e.target.name === "profilePhoto") {
      setInput({ ...input, profilePhoto: file });
    } else if (e.target.name === "resume") {
      setInput({ ...input, file: file });
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
    formData.append(
      "skills",
      input.skills.split(", ").map((skill) => skill.trim())
    );
    if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);
    if (input.file) formData.append("resume", input.file);

    // Debugging FormData before sending
    //  console.log("FormData contents before sending:");
    for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.data));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const renderInputField = (label, type, name, value) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={changeEventHandler}
        id={name}
        className="col-span-3 w-full"
      />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-2">
            {renderInputField("Full Name", "text", "fullname", input.fullname)}
            {renderInputField("Email", "email", "email", input.email)}
            {renderInputField(
              "Phone Number",
              "text",
              "phoneNumber",
              input.phoneNumber
            )}
            {renderInputField("Bio", "text", "bio", input.bio)}

            {/* Only show Skills and Resume fields if the user is NOT a recruiter */}
            {user?.role !== "recruiter" && (
              <>
                {/* Skills Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    type="text"
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                    id="skills"
                    className="col-span-3 w-full"
                    placeholder="Comma separated"
                  />
                </div>

                {/* Resume Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Label htmlFor="resume">Resume</Label>
                  <Input
                    type="file"
                    onChange={fileChangeHandler}
                    id="resume"
                    name="resume"
                    accept="application/pdf"
                    className="col-span-3 w-full"
                  />
                </div>
              </>
            )}

            {/* Profile Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                type="file"
                onChange={fileChangeHandler}
                id="profileImage"
                className="col-span-3 w-full"
                accept="image/*"
                name="profilePhoto"
              />
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
