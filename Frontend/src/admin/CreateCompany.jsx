import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/layout/Navbar";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/public/companyslice";

function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name.");
      return;
    }

    try {
     const token = localStorage.getItem("token");
     // console.log(token);
     
      if (!token) {
        toast.error("You are not logged in. Please log in and try again.");
        return;
      } 

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

     // console.log("API Response:", res.data); // Debugging: Log the response

      const company = res?.data?.message;
      const companyId = company?._id;
     // console.log("Full API Response", res.data);
     // console.log("CompanyId", companyId);

      if (res?.data?.success) {
        dispatch(setSingleCompany(company));
        toast.success(
          res?.data?.message?.text || "Company registered successfully!"
        ); // Use proper success message

        if (companyId) {
          // Delay navigation until after the toast is shown
          setTimeout(() => {
            navigate(`/admin/companies/${companyId}`);
          }, 500); // Add a small delay for the toast to show up
        } else {
          toast.error("Failed to retrieve company ID.");
        }
      } else {
        toast.error(res?.data?.message || "Company registration failed.");
      }
    } catch (error) {
      console.error("Error registering company:", error);
      toast.error("Failed to register the company. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p>
            What would you like to give your company name? You can also change
            this later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          placeholder="Jobhunt, Microsoft"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => navigate("/companies")}>
            Cancel
          </Button>
          <Button onClick={registerCompany}>Continue</Button>
        </div>
      </div>
    </>
  );
}

export default CreateCompany;
