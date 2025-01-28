import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setCompanies } from "@/public/companyslice";

function useGetAllCompanies() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      //  console.log("API RESPONSE", res.data);
        
        if (res.data.success) {
          // Fixed typo from 'sucess' to 'success'
          dispatch(setCompanies(res.data.message));
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        // You can handle the error here by dispatching an error state to the Redux store, for example
      }
    };
    fetchCompanies();

    // Cleanup function in case of component unmount
    return () => {
      // Any cleanup logic if needed
    };
  }, [dispatch]); // Added dispatch to the dependency array
}

export default useGetAllCompanies;
