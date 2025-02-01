import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/layout/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/public/jobslice";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "@/utils/constant";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { motion } from "framer-motion"; // Import Framer Motion for animation

function JobsDescription() {
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const params = useParams();
  const jobId = params.id;
  const { singlejob } = useSelector((store) => store.job); // Use correct state key 'singlejob'
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // Fetch the job details when component mounts
  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true); // Set loading to true when starting to fetch data
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.data)); // Dispatch the job data to Redux store
          setIsApplied(
            res.data.data.applications?.some(
              (application) => application.applicant === user?._id
            ) || false
          );
        } else {
          toast.error("Job not found or error occurred");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch job details."
        );
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // Handler to apply for the job
  const applyJobHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singlejob,
          applications: [
            ...(singlejob.applications || []),
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to apply for the job."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }} // Initial opacity when component loads
          animate={{ opacity: 1 }} // Fade-in effect when visible
          transition={{ duration: 0.5 }} // Smooth transition for fade-in
        >
          <div>
            <h1 className="font-bold text-xl">{singlejob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
                {singlejob?.position} Position
              </Badge>
              <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
                {singlejob?.jobType}
              </Badge>
              <Badge className={"text-[#7209B7] font-bold"} variant={"ghost"}>
                {singlejob?.salary} LPA
              </Badge>
            </div>
          </div>
          <div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied || loading}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed text-white"
                  : "bg-[#9cd6f1] hover:bg-[#2d75cd] text-black"
              }`}
            >
              {isApplied
                ? "Already Applied"
                : loading
                ? "Applying..."
                : "Apply Now"}
            </Button>
          </div>
        </motion.div>

        <h1 className="border-b-2 border-b-gray-300 font-semibold py-4">
          Job Description
        </h1>

        {singlejob ? (
          <div className="my-4">
            <h1 className="font-bold my-1">
              Role:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {singlejob.title}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Location:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {singlejob.location}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Description:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {singlejob.description}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Experience:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {singlejob.experience}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Salary:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {singlejob.salary}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Total Applicants:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {singlejob.applications ? singlejob.applications.length : 0}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Posted Date:{" "}
              <span className="pl-4 font-normal text-gray-800">
                {singlejob.createdAt?.split("T")[0]}
              </span>
            </h1>
          </div>
        ) : (
          <div>Loading job details...</div>
        )}
      </div>
    </>
  );
}

export default JobsDescription;
