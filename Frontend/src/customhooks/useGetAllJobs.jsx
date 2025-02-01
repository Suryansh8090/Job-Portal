import { setAllJobs } from "@/public/jobslice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Check if searchedQuery is non-empty
        if (!searchedQuery) {
          console.log("No search query provided.");
          return;
        }

        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to headers
            },
            withCredentials: true,
          }
        );

        // Log the entire response to debug
        console.log("API Response:", res);

        // Check if the response has the expected structure
        if (res.data.success && Array.isArray(res.data.data)) {
          dispatch(setAllJobs(res.data.data));
          console.log("Jobs retrieved:", res.data.data);
        } else {
          console.log("No jobs found or invalid response:", res.data);
          dispatch(setAllJobs([])); // Dispatch an empty array if no jobs found
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
        dispatch(setAllJobs([])); // Dispatch an empty array in case of error
      }
    };

    if (searchedQuery) {
      fetchAllJobs();
    }
  }, [searchedQuery, dispatch]);

}

export default useGetAllJobs;
