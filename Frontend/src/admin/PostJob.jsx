import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/layout/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

function PostJob() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    companyId: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id: jobId } = useParams(); // Extract jobId from the URL
  const { companies } = useSelector((store) => store.company);
  const { allAdminJobs } = useSelector((store) => store.job);

  // Fetch job data for editing
  useEffect(() => {
    if (jobId) {
      const job = allAdminJobs.find((job) => job._id === jobId); // Try to fetch from Redux
      if (job) {
        setInput({
          title: job.title || "",
          description: job.description || "",
          requirements: job.requirements || "",
          salary: job.salary || "",
          location: job.location || "",
          jobType: job.jobType || "",
          experience: job.experience || "",
          companyId: job.companyId || "",
          position: job.position || "",
        });
      } else {
        // Fetch from the server if not found in Redux
        axios
          .get(`${JOB_API_END_POINT}/jobs/${jobId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setInput({
              title: res.data.title || "",
              description: res.data.description || "",
              requirements: res.data.requirements || "",
              salary: res.data.salary || "",
              location: res.data.location || "",
              jobType: res.data.jobType || "",
              experience: res.data.experience || "",
              companyId: res.data.companyId || "",
              position: res.data.position || "",
            });
          })
          .catch((error) => {
            console.error("Failed to fetch job data:", error);
            toast.error("Failed to load job data.");
          });
      }
    }
  }, [jobId, allAdminJobs]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const url = jobId
        ? `${JOB_API_END_POINT}/jobs/${jobId}`
        : `${JOB_API_END_POINT}/post`;
      const method = jobId ? "put" : "post"; // Use PUT for editing, POST for creating

      const res = await axios[method](url, input, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error("Error submitting job data:", error.response);
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center my-10">
        <form onSubmit={handleSubmit} className="p-8 shadow-lg rounded-md">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirement</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Number of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length > 0 && (
              <Select
                onValueChange={selectChangeHandler}
                value={companies.find(
                  (company) => company._id === input.companyId
                )?.name.toLowerCase()}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company?.name?.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Saving..." : jobId ? "Update Job" : "Post New Job"}
          </Button>
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              Please register a company first, before posting a job!
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default PostJob;
