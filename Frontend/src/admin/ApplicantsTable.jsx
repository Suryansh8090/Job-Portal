import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { motion } from "framer-motion"; // Import Framer Motion

function ApplicantsTable({ jobId }) {
  const shortlistingStatus = ["Accepted", "Rejected"];
  const { allApplicants } = useSelector((store) => store.application); // Accessing applicants from Redux store
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  // Effect hook to filter applicants based on jobId when it changes
  useEffect(() => {
    if (!jobId) {
      console.error('jobId is missing'); // Handle missing jobId
      return;
    }

    // Filter applicants by jobId from Redux store
    if (allApplicants && allApplicants.length > 0) {
      const applicantsForJob = allApplicants.filter((applicant) => String(applicant.jobId) === String(jobId));
      setFilteredApplicants(applicantsForJob); // Update filtered applicants
    }
  }, [allApplicants, jobId]);

  // Function to handle status update of applicants
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.data); // Show success message
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message); // Show error message
    }
  };

  return (
    <div className="p-4"> {/* Wrapping the table with padding */}
      <h2 className="text-center text-xl mb-4">Applicants List</h2>
      <Table className="w-full">
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
                key={item._id} // Apply motion effect for each applicant
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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
                            onClick={() => statusHandler(status, item._id)}
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
    </div>
  );
}

export default ApplicantsTable;
