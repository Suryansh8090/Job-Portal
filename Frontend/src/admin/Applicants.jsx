import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import Navbar from "@/layout/Navbar";
import { motion } from "framer-motion"; // Importing Framer Motion

function ApplicantsTable({ jobId }) {
  const shortlistingStatus = ["Accepted", "Rejected"];
  const { allApplicants } = useSelector((store) => store.application); // Accessing the allApplicants from the Redux store
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [applicantCount, setApplicantCount] = useState(0); // State to store applicant count

  useEffect(() => {
    console.log('Received jobId:', jobId); // Log the jobId prop to check if it's passed correctly

    if (!jobId) {
      console.error('jobId is undefined or missing'); // Handle missing jobId case
      return; // Skip further logic if jobId is not available
    }

    console.log('All Applicants:', allApplicants); // Log all applicants from Redux store

    // Filter applicants by jobId
    if (allApplicants && allApplicants.length > 0) {
      const applicantsForJob = allApplicants.filter((applicant) => {
        console.log('Applicant Job ID:', applicant.jobId); // Log the jobId for each applicant
        console.log('Checking if applicant jobId matches current jobId');
        return String(applicant.jobId) === String(jobId); // Ensure correct property is being checked
      });

      console.log('Filtered Applicants:', applicantsForJob); // Log the filtered applicants
      setFilteredApplicants(applicantsForJob);
      setApplicantCount(applicantsForJob.length); // Set the applicant count based on the filtered applicants
    }
  }, [allApplicants, jobId]);

  const statusHandler = async (status, id) => {
    try {
      console.log(`Updating status of applicant ${id} to ${status}`); // Log the status update
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adding authorization token from localStorage
          },
          withCredentials: true,
        }
      );
      console.log('API Response:', res); // Log API response

      if (res.data.success) {
        toast.success(res.data.data);
      }
    } catch (error) {
      console.error('Error updating status:', error.response ? error.response.data.message : error.message); // Log error message
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-center text-xl font-semibold mb-4">Total Applicants: {applicantCount}</h2> {/* Display the total number of applicants */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Table className="min-w-full table-auto">
            <TableCaption>A list of your recent applied users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableRow>
                      <TableCell>{item.applicant.fullname}</TableCell>
                      <TableCell>
                        {item.applicant.profile.resume ? (
                          <a
                            className="text-blue-600 cursor-pointer font-semibold text-lg"
                            href={item.applicant.profile.resume}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Resume
                          </a>
                        ) : (
                          "No resume uploaded"
                        )}
                      </TableCell>
                      <TableCell>
                        <a
                          className="text-blue-600 cursor-pointer font-semibold"
                          href={`mailto:${item.applicant.email}`}
                        >
                          {item.applicant.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        {format(new Date(item.createdAt), "MM/dd/yyyy")}
                      </TableCell>
                      <TableCell>{item.applicant.phoneNumber}</TableCell>
                      <TableCell className="text-right">
                        <Popover>
                          <PopoverTrigger>
                            <MoreHorizontal />
                          </PopoverTrigger>
                          <PopoverContent className="w-32">
                            {shortlistingStatus.map((status, index) => (
                              <div
                                key={index}
                                className="flex w-fit items-center my-2 cursor-pointer"
                                onClick={() =>
                                  statusHandler(status, item._id)
                                }
                              >
                                <span>{status}</span>
                              </div>
                            ))}
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  </motion.div>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" className="text-center">
                    No applicants found for this job
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </>
  );
}

export default ApplicantsTable;
