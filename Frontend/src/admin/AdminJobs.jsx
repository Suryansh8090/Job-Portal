import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/layout/Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "@/public/jobslice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/customhooks/useGetAllAdminJobs";

function AdminJobs() {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-2 ">
          <Input
            className="w-fit"
            placeholder="Filter By Name and Role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            {" "}
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </>
  );
}

export default AdminJobs;
