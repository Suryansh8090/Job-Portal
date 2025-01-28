import Navbar from "@/layout/Navbar";
import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/public/applicantionslice";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const { allApplicants } = useSelector(store => store.application);  // Use the correct variable name

//  console.log("Applicants from store", allApplicants);  // Check what is stored

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        
   //     console.log("Fetched applicants data:", res.data.data);  // Ensure data is correct
        
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.data));  // Set the applicants in Redux store
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchAllApplicants();  // Fetch applicants when the component mounts
  }, [params.id, dispatch]);  // Dependency array should only include params.id and dispatch

  return (
    <>
      <Navbar />
      <div className="my-10 mx-5 sm:mx-10 md:mx-16 lg:mx-20 xl:mx-28">
        <h1 className="font-bold text-lg sm:text-xl lg:text-2xl my-5 text-center lg:text-left">
          Applicants {allApplicants?.length || 0}  {/* Use allApplicants */}
        </h1>
        <div className="overflow-x-auto">
          <ApplicantsTable />
        </div>
      </div>
    </>
  );
}

export default Applicants;
