import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, MoreHorizontal, Eye } from "lucide-react"; // Added Eye import
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchAllJobs from "../public/jobslice"; // Assuming this action exists for fetching jobs
import { motion } from "framer-motion"; // Import Framer Motion

function AdminJobsTable() {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const user = useSelector((store) => store.auth.user); // Get the user object
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs || []); // Initialize with an empty array if no jobs
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  // Check if user is available from localStorage or redux state
  if (!user) {
    return <div>Loading user data...</div>; // Show loading state while user data is fetched
  }

  const userId = user?._id; // Now it's safe to access userId since user exists
  
  // Fetch jobs if not already loaded and filter based on search and userId
  useEffect(() => {
    if (!allAdminJobs || allAdminJobs.length === 0) {
      dispatch(fetchAllJobs()); // Fetch jobs if not already available
    }
  }, [allAdminJobs, dispatch]);

  useEffect(() => {
    if (allAdminJobs.length > 0) {
      // Filter jobs based on userId and search text
      const filtered = allAdminJobs.filter((job) => {
        if (job.created_by === userId) {
          if (!searchJobByText) return true; // If no search text, show the job
          return (
            job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
            job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
          );
        }
        return false; // Only show jobs posted by the current user
      });

      setFilterJobs(filtered); // Update filtered jobs state
      setLoading(false); // Set loading to false once jobs are filtered
    } else {
      setError("No jobs found for the admin.");
      setLoading(false); // Set loading to false if no jobs found
    }
  }, [allAdminJobs, searchJobByText, userId]);

  // Handle loading, error, and display job details
  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if no jobs found
  }

  return (
    <div className="p-4"> {/* Wrapper with padding for the table */}
      <h2 className="text-center text-xl mb-4">Your Posted Jobs</h2> {/* Table Title */}
      <Table className="w-full">
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length > 0 ? (
            filterJobs.map((job) => (
              <motion.div
                key={job._id} // Apply motion effect for each job
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TableRow>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>
                    {new Date(job?.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() => navigate(`/admin/jobs/${job?._id}`)}
                          className="flex items-center gap-2 w-fit cursor-pointer"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job?._id}/applicants`)
                          }
                          className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              </motion.div>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                YOU have not posted any job yet!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
