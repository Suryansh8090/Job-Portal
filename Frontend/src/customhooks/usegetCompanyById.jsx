import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setSingleCompany } from "@/public/companyslice";

function usegetCompanyById(companyId) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchsingleCompany = async () => {
      try {
        console.log("Fetching company with ID:", companyId);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log("API Response:", res);

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.data));
        } else {
          console.log("Error: No company found");
        }
      } catch (error) {
        console.log("Error fetching company:", error);
      }
    };

    if (companyId) {
      fetchsingleCompany();
    }
  }, [companyId, dispatch]);
}

export default usegetCompanyById;
