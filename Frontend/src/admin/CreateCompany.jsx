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
import { motion } from "framer-motion"; // Import Framer Motion

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

      const company = res?.data?.message;
      const companyId = company?._id;

      if (res?.data?.success) {
        dispatch(setSingleCompany(company));
        toast.success(
          res?.data?.message?.text || "Company registered successfully!"
        );

        if (companyId) {
          setTimeout(() => {
            navigate(`/admin/companies/${companyId}`);
          }, 500);
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
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="my-10">
          <h1 className="font-bold text-2xl sm:text-3xl">Your Company Name</h1>
          <p className="text-gray-600">
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
          className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 my-4"
        />
        <div className="flex flex-col sm:flex-row gap-4 my-10 justify-between sm:items-center">
          <Button
            variant="outline"
            onClick={() => navigate("/companies")}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={registerCompany}
            className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </>
  );
}

export default CreateCompany;
