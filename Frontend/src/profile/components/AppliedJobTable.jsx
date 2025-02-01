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

  // Function to handle status badge color logic
  const getStatusClass = (status) => {
    switch (status) {
      case "rejected":
        return "text-red-400";
      case "pending":
        return "text-gray-700";
      case "accepted":
        return "text-green-400";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="overflow-x-auto"> {/* Allow horizontal scrolling on small screens */}
      <Table className="min-w-full">
        <TableCaption className="font-semibold text-black">
          A List of Your Applied Jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-left">Job Role</TableHead>
            <TableHead className="text-left">Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs && allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-GB")
                    : "N/A"}
                </TableCell>

                <TableCell>{item.job?.title}</TableCell>
                <TableCell>{item.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${getStatusClass(item?.status)} font-bold`}
                    variant="outline"
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-gray-500">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJob;
