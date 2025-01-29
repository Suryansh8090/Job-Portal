import { setAllAdminJobs } from "@/public/jobslice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant"; // Assuming JOB_API_END_POINT is defined in your constants

function useGetAllAdminJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        // Fetching the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Authorization token is missing");
          return;
        }

        // Make the API request to fetch jobs
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // This ensures cookies are sent along with the request if needed
        });

        // Check if the response is successful and contains job data
        if (res.data.success && res.data.data) {
          // Dispatch jobs data to Redux store
          dispatch(setAllAdminJobs(res.data.data));
        } else {
          console.error(
            "No job data found:",
            res.data.message || "No jobs available"
          );
        }
      } catch (error) {
        // Log any errors encountered during the API request
        console.error("Error fetching admin jobs: ", error.message);
      }
    };

    // Trigger the fetch function
    fetchAllAdminJobs();
  }, [dispatch]);

  // Returning nothing since the hook is only fetching data and dispatching to the store
}

export default useGetAllAdminJobs;
