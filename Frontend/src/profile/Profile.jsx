import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "@/layout/Navbar";
import { Contact, Mail, Pen } from "lucide-react";
import React from "react";
import AppliedJob from "./components/AppliedJobTable";

function Profile() {
  const skills = ["HTML", "CSS", "JS", "REACTJS"];
  const isResume = true;
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border  border-gray-400 rounded-2xl my-5  p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuOC-Wr4_60z9IYM0ftBso6_uhi8_mNq7LWg&s" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>bugiu bkgiug kjbiugiu kjguig kjgugi</p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="mx-5 my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>suryanshkushwaha1235@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>7007290254</span>
          </div>
        </div>
        <div className=" flex mx-5  gap-4 my-5">
          <h1 className="font-semibold">Skills</h1>
          <div className="flex items-center gap-1">
            {skills.length !== 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm item-center gap-1.5 mx-5">
          {isResume ? (
            <a
              target="blank"
              className="text-md font-bold hover:text-blue-500"
              href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuOC-Wr4_60z9IYM0ftBso6_uhi8_mNq7LWg&s"
            >
              Resume
              <hr className=" w-14 h-1 bg-black  border-0 rounded" />
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-4xl bg-white rounded-2xl ">
        {/* Application Table  */}
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJob />
      </div>
    </>
  );
}

export default Profile;
