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
import { Edit2, MoreHorizontal, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchAllJobs from "../public/jobslice";
import { motion } from "framer-motion";

function AdminJobsTable() {
  const { allAdminJobs, searchJobByText, loading } = useSelector(
    (store) => store.job
  );
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (!allAdminJobs || allAdminJobs.length === 0) {
      dispatch(fetchAllJobs());
    }
  }, [dispatch, allAdminJobs]);

  useEffect(() => {
    if (allAdminJobs?.length > 0 && user?._id) {
      setFilterJobs(
        allAdminJobs.filter(
          (job) =>
            job.created_by === user._id &&
            (!searchJobByText ||
              job?.company?.name
                ?.toLowerCase()
                .includes(searchJobByText.toLowerCase()) ||
              job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()))
        )
      );
    }
  }, [allAdminJobs, searchJobByText, user]);

  if (!user) return <div>Loading user data...</div>;
  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="p-4">
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
          {filterJobs.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow
                key={job._id}
                as={motion.tr}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                You have not posted any job yet!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
