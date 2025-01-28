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
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

function ApplicantsTable() {
  const shortlistingStatus = ["Accepted", "Rejected"];
  const { allApplicants } = useSelector((store) => store.application); // Accessing the allApplicants from the Redux store
  const statusHandler = async (status, id) => {
    try {
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
      console.log(res);

      if (res.data.success) {
        toast.success(res.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleStatusChange = (applicantId, status) => {
    // Handle the status change logic here (e.g., dispatching Redux actions or API calls)
    console.log(`Changing status of applicant ${applicantId} to ${status}`);
    // Implement your logic to change the applicant status
  };

  return (
    <div>
      <Table>
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
          {allApplicants &&
            allApplicants.map((item) => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.applicant.fullname}</TableCell>{" "}
                  {/* Display full name */}
                  <TableCell>
                    {item.applicant.profile.resume ? (
                      <a
                        className="text-blue-600 cursor-pointer font-semibold text-lg"
                        href={item.applicant.profile.resume} // Resume URL
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
                  {/* Display email */}
                  <TableCell>
                    {format(new Date(item.createdAt), "MM/dd/yyyy")}
                  </TableCell>{" "}
                  {/* Format the date */}
                  <TableCell>{item.applicant.phoneNumber}</TableCell>{" "}
                  {/* Display contact number */}
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
                              statusHandler(status, item?._id)
                            } // Pass the applicant's ID and status
                          >
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
