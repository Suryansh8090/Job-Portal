import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function SingleJob({ job, onDelete }) {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Bookmark state
  const [bookmarked, setBookmarked] = useState(false);

  // Toggle bookmark handler

  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/status/${job._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setIsApplied(res.data?.data?.isApplied || false);
      } catch (err) {
        console.error("Error checking application status", err);
        setIsApplied(false);
      }
    };

    if (user?._id && job?._id) {
      checkIfApplied();
    }
  }, [job._id, user?._id]);

  const toggleBookmark = () => {
    setBookmarked((prev) => !prev);
  };

  const applyJobHandler = async () => {
    if (isApplied) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${job._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        toast.success(res.data.data);
      } else {
        toast.error("Failed to apply.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to apply for the job."
      );
    } finally {
      setLoading(false);
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <motion.div
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <p className="text-md text-gray-500 font-semibold">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>

        {/* Bookmark Button */}
        <Button
          variant="outline"
          className={`rounded-full ${bookmarked ? "bg-[#7adf7a]" : "bg-white"}`}
          size="icon"
          onClick={toggleBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark color={bookmarked ? "#00008B" : "#6B7280" /* gray-500 */} />
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 my-4">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-md font-bold">{job?.company?.name}</h1>
          <p className="font-semibold text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209B7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button
          onClick={applyJobHandler}
          disabled={isApplied || loading}
          variant="outline"
          className={`w-full sm:w-auto ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed text-white"
              : "bg-[#9cd6f1] hover:bg-[#2d75cd] text-black"
          }`}
        >
          {isApplied
            ? "Already Applied"
            : loading
            ? "Applying..."
            : "Apply Now"}
        </Button>
      </div>
    </motion.div>
  );
}

export default SingleJob;
