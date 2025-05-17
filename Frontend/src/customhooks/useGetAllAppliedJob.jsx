import { setAllAppliedJobs } from "@/public/jobslice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAllAppliedJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetched token:", token);
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
