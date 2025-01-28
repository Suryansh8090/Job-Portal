import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";

function AppliedJob() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  //  console.log("AppliedJobs:", allAppliedJobs); // Check the output here

  return (
    <Table>
      <TableCaption className="font-semibold text-black">
        A List of your applied Jobs
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Job Rule</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allAppliedJobs && allAppliedJobs.length > 0 ? (
          allAppliedJobs.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {item?.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-GB") // Formats as "DD/MM/YYYY"
                  : "N/A"}
              </TableCell>

              <TableCell>{item.job.title}</TableCell>
              <TableCell>{item.job.company.name}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`${
                    item?.status === "rejected"
                      ? "text-red-400"
                      : item?.status === "pending"
                      ? "text-gray-700"
                      : "text-green-400"
                  } font-bold `}
                  variant="outline"
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="4">You haven't applied' any job yet.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default AppliedJob;
