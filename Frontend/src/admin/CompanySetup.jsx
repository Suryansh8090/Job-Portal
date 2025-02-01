import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/layout/Navbar";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import usegetCompanyById from "@/customhooks/usegetCompanyById";

function CompanySetup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  // Fetch company data when the component mounts
  usegetCompanyById(params.id);

  // Update input values when singleCompany is fetched
  useEffect(() => {
    if (singleCompany) {
      const { name, description, website, location, file } = singleCompany;
      setInput({
        name: name || "",
        description: description || "",
        website: website || "",
        location: location || "",
        file: file || null,
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput((prevState) => ({ ...prevState, file }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, description, website, location, file } = input;

    if (!name.trim()) {
      toast.error("Company name is required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("website", website);
    formData.append("location", location);
    if (file) formData.append("file", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Company information updated!");
        navigate("/companies");
      } else {
        toast.error("Failed to update the Company!");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!singleCompany) {
    return <div>Loading...</div>; // Show loading while fetching company data
  }

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={() => navigate("/companies")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1>Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name || ""}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description || ""}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website || ""}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location || ""}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="flex items-center justify-center w-full bg-blue-600 text-white hover:bg-blue-700">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </>
  );
}

export default CompanySetup;
