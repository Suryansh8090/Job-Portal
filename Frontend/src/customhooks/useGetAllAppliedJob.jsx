import { setAllAppliedJobs, setAllJobs } from "@/public/jobslice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

function useGetAllAppliedJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
     //   console.log(res.data);

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAppliedJobs();
  }, []);
}

export default useGetAllAppliedJobs;
