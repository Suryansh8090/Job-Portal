import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/layout/Navbar";
import React, { useEffect, useState } from "react";
import PositionTable from "./PositionTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/customhooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/public/companyslice";

function Companies() {
  const navigate = useNavigate();

  useGetAllCompanies();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-2 ">
          <Input
            className="w-fit"
            placeholder="Filter By Name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            {" "}
            New Vacancy
          </Button>
        </div>
        <PositionTable />
      </div>
    </>
  );
}

export default Companies;
