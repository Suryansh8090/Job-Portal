import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "@/layout/Navbar";
import { Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import AppliedJob from "./components/AppliedJobTable";
import UpdateProfileDialog from "./components/UpdateProfileDialog";
import { useSelector } from "react-redux";

function Profile() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth); // Fetch user from Redux state

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-400 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSDBMGpoT7bM8E61PuHZmA7K8XG69m1qmjQ&s"
                }
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio || "No bio available"}</p>
            </div>
          </div>
          <Button
            className="text-right"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Pen />
          </Button>
        </div>
        <div className="mx-5 my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="flex mx-5 gap-4 my-5">
          <h1 className="font-semibold">Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm item-center gap-1.5 mx-5">
          {user?.profile?.resume ? (
            <a
              target="_blank"  
              className="text-md font-bold hover:text-blue-500"
              href={user?.profile?.resume}
            >
              Resume
              <hr className="w-14 h-1 bg-black border-0 rounded" />
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-4xl bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJob />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>
  );
}

export default Profile;
