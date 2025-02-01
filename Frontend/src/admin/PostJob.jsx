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
import { motion } from "framer-motion";  // Import Framer Motion

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

  // Fetch Redux state
  const { companies } = useSelector((store) => store.company);
  const { allAdminJobs } = useSelector((store) => store.job);
  const loggedInUser = useSelector((store) => store.auth?.user);
  const loggedInUserId = loggedInUser?._id || loggedInUser?.id; // Ensure compatibility

  // Filter companies belonging to the logged-in user
  const userCompanies = companies?.filter(
    (company) => company.userId === loggedInUserId
  );

  // Fetch job data for editing
  useEffect(() => {
    if (jobId) {
      const job = allAdminJobs.find((job) => job._id === jobId);
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
    setInput({ ...input, companyId: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCompany = companies.find(
      (company) => company._id === input.companyId
    );

    if (!selectedCompany || selectedCompany.userId !== loggedInUserId) {
      toast.error("You can only post jobs for your own companies.");
      return;
    }

    try {
      setLoading(true);

      const url = jobId
        ? `${JOB_API_END_POINT}/jobs/${jobId}`
        : `${JOB_API_END_POINT}/post`;
      const method = jobId ? "put" : "post";

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
        <motion.form
          onSubmit={handleSubmit}
          className="p-8 shadow-lg rounded-md w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
            </div>
            <div>
              <Label>Number of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full"
              />
            </div>
            <div>
              <Label>Requirement</Label>
              <textarea
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                rows="5"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full p-2 border border-gray-300 rounded-md resize-none"
              />
            </div>
            <div>
              <Label>Description</Label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                rows="5"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full p-2 border border-gray-300 rounded-md resize-none"
              />
            </div>

            {/* Show company selection dropdown only if user has companies */}
            {userCompanies.length > 0 ? (
              <Select
                onValueChange={selectChangeHandler}
                value={input.companyId || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {userCompanies.map((company) => (
                      <SelectItem key={company._id} value={company._id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <div>
                <Button
                  className="w-full mt-2 flex justify-center"
                  onClick={() => navigate("/admin/companies/create")}
                >
                  Register a Company
                </Button>
                {/* Message prompting user to register a company */}
                <p className="text-red-500 text-sm mt-2 text-center">
                  Please register a company first before posting a job.
                </p>
              </div>
            )}
          </div>

          {/* Show the Post New Job button only if the user has a company */}
          {userCompanies.length > 0 && (
            <div className="flex justify-center mt-4">
              <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                {loading ? "Saving..." : jobId ? "Update Job" : "Post New Job"}
              </Button>
            </div>
          )}
        </motion.form>
      </div>
    </>
  );
}

export default PostJob;
