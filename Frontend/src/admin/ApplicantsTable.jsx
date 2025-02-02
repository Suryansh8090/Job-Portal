import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { motion } from "framer-motion"; // Import Framer Motion

function ApplicantsTable({ jobId }) {
  const shortlistingStatus = ["Accepted", "Rejected"];
  const { allApplicants } = useSelector((store) => store.application); // Get applicants from Redux store
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  useEffect(() => {
    if (!jobId) return;

    const applicantsForJob = allApplicants.filter(
      (applicant) => String(applicant.job) === String(jobId)
    );

    setFilteredApplicants(applicantsForJob);
  }, [allApplicants, jobId]);

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
      if (res.data.success) toast.success(res.data.data);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <motion.div
      className="overflow-x-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplicants.length ? (
            filteredApplicants.map((item) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="border-b"
              >
                <TableCell>{item.applicant.fullname}</TableCell>
                <TableCell>
                  {item.applicant.profile.resume ? (
                    <a
                      href={item.applicant.profile.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 cursor-pointer font-semibold"
                      onClick={() => {
                        console.log(
                          "Opening resume:",
                          item.applicant.profile.resume
                        ); // Log the resume URL
                      }}
                    >
                      Resume
                    </a>
                  ) : (
                    "No resume uploaded"
                  )}
                </TableCell>
                <TableCell>
                  <a
                    href={`mailto:${item.applicant.email}`}
                    className="text-blue-600 cursor-pointer font-semibold"
                  >
                    {item.applicant.email}
                  </a>
                </TableCell>
                <TableCell>
                  {format(new Date(item.createdAt), "MM/dd/yyyy")}
                </TableCell>
                <TableCell>{item.applicant.phoneNumber}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className=" w-22 flex flex-row  rounded-lg">
                      {shortlistingStatus.map((status) => (
                        <div
                          key={status}
                          className={`cursor-pointer my-2 ${
                            status === "Accepted"
                              ? "hover:text-green-500"
                              : "hover:text-red-500"
                          } p-2 rounded transition-colors`}
                          onClick={() => statusHandler(status, item._id)}
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No applicants found for this job
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
}

export default ApplicantsTable;
