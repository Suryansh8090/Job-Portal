import { setAllAdminJobs } from "@/public/jobslice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant";

function useGetAllAdminJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Authorization token is missing");
          return;
        }

        // Make the request
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        // Log the entire response to check its structure
        //  console.log("API Response:", res.data);

        // Check for the expected key and handle accordingly
        if (res.data.success && res.data.data) {
          dispatch(setAllAdminJobs(res.data.data)); // Assuming allJobs is the key where job data is stored
        } else {
          console.error(
            "No job data found:",
            res.data.message || "No jobs available"
          );
        }
      } catch (error) {
        console.error("Error fetching admin jobs: ", error.message);
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]);
}

export default useGetAllAdminJobs;
