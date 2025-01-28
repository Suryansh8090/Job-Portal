// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Navbar from "@/layout/Navbar";
// import axios from "axios";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { COMPANY_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";

// function CompanySetup() {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const params = useParams();
//   const { singleCompany } = useSelector((store) => store.company);
//   const [input, setInput] = useState({
//     name: "",
//     description: "",
//     website: "",
//     location: "",
//     file: "",
//   });

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };
//   const changeFileHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput({ ...input, file });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     // console.log(input);

//     const formData = new FormData();
//     formData.append("name", input.name);
//     formData.append("description", input.description);
//     formData.append("website", input.website);
//     formData.append("location", input.location);
//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       // console.log(token);

//       const res = await axios.put(
//         `${COMPANY_API_END_POINT}/update/${params.id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message || "Company information updated!");
//         navigate(`/companies`);
//       } else {
//         toast.error("Failed to update the Company!");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       const errorMessage =
//         error.response?.data?.message || error.message || "An error occurred.";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setInput({
//       name: singleCompany.name || "",
//       description: singleCompany.description || "",
//       website: singleCompany.website || "",
//       location: singleCompany.location || "",
//       file: singleCompany.file || null,
//     });
//   }, [singleCompany]);

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-xl mx-auto my-10">
//         <form onSubmit={submitHandler}>
//           <div className="flex items-center gap-5 p-8">
//             <Button
//               variant="outline"
//               className="flex items-center gap-2 text-gray-500 font-semibold"
//               onClick={() => navigate("/companies")}
//             >
//               <ArrowLeft />
//               <span>Back</span>
//             </Button>
//             <h1>Company Setup</h1>
//           </div>
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <Label>Company Name</Label>
//               <Input
//                 type="text"
//                 name="name"
//                 value={input.name || ""}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Description</Label>
//               <Input
//                 type="text"
//                 name="description"
//                 value={input.description || ""}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Website</Label>
//               <Input
//                 type="text"
//                 name="website"
//                 value={input.website || ""}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Location</Label>
//               <Input
//                 type="text"
//                 name="location"
//                 value={input.location || ""}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Logo</Label>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={changeFileHandler}
//               />
//             </div>
//           </div>
//           {loading ? (
//             <Button className="flex items-center justify-center w-full bg-blue-600 text-white hover:bg-blue-700">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Please wait
//             </Button>
//           ) : (
//             <Button
//               type="submit"
//               className="w-full bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Update
//             </Button>
//           )}
//         </form>
//       </div>
//     </>
//   );
// }

// export default CompanySetup;

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Navbar from "@/layout/Navbar";
// import axios from "axios";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { COMPANY_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";
// import usegetCompanyById from "@/customhooks/usegetCompanyById";

// function CompanySetup() {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const params = useParams();

//   const { singleCompany } = useSelector((store) => store.company);
//   console.log("Redux State - singleCompany:", singleCompany);

//   const [input, setInput] = useState({
//     name: "",
//     description: "",
//     website: "",
//     location: "",
//     file: "",
//   });

//   usegetCompanyById(params.id);

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const changeFileHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput({ ...input, file });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     // Validation: Check if the name is empty
//     if (!input.name.trim()) {
//       toast.error("Company name is required!");
//       return; // Prevent form submission if name is empty
//     }
//     const formData = new FormData();
//     formData.append("name", input.name);
//     formData.append("description", input.description);
//     formData.append("website", input.website);
//     formData.append("location", input.location);
//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       const res = await axios.put(
//         `${COMPANY_API_END_POINT}/update/${params.id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message || "Company information updated!");
//         // Navigate directly to companies page after success
//         console.log("Redirecting to /companies");
//         navigate("/companies");
//       } else {
//         toast.error("Failed to update the Company!");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       const errorMessage =
//         error.response?.data?.message || error.message || "An error occurred.";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   console.log("singleCompany updated:", singleCompany);
//   //   if (singleCompany) {
//   //     setInput({
//   //       name: singleCompany?.name || "",
//   //       description: singleCompany?.description || "",
//   //       website: singleCompany?.website || "",
//   //       location: singleCompany?.location || "",
//   //       file: singleCompany?.file || null,
//   //     });
//   //   }
//   // }, [singleCompany]);

//   useEffect(() => {
//     if (singleCompany) {
//       setInput((prev) => ({
//         ...prev,
//         name: singleCompany.name || prev.name,
//         description: singleCompany.description || prev.description,
//         website: singleCompany.website || prev.website,
//         location: singleCompany.location || prev.location,
//         file: singleCompany.file || prev.file,
//       }));
//     }
//   }, [singleCompany]);

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-xl mx-auto my-10">
//         <form onSubmit={submitHandler}>
//           <div className="flex items-center gap-5 p-8">
//             <Button
//               variant="outline"
//               className="flex items-center gap-2 text-gray-500 font-semibold"
//               onClick={() => navigate("/companies")}
//             >
//               <ArrowLeft />
//               <span>Back</span>
//             </Button>
//             <h1>Company Setup</h1>
//           </div>
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <Label>Company Name</Label>
//               <Input
//                 type="text"
//                 name="name"
//                 value={input.name || ""}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Description</Label>
//               <Input
//                 type="text"
//                 name="description"
//                 value={input.description || ""}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Website</Label>
//               <Input
//                 type="text"
//                 name="website"
//                 value={input.website || ""}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Location</Label>
//               <Input
//                 type="text"
//                 name="location"
//                 value={input.location || ""}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Logo</Label>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={changeFileHandler}
//               />
//             </div>
//           </div>
//           {loading ? (
//             <Button className="flex items-center justify-center w-full bg-blue-600 text-white hover:bg-blue-700">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Please wait
//             </Button>
//           ) : (
//             <Button
//               type="submit"
//               className="w-full bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Update
//             </Button>
//           )}
//         </form>
//       </div>
//     </>
//   );
// }

// export default CompanySetup;


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
    file: "",
  });

  // Custom hook to fetch company data by ID
  usegetCompanyById(params.id);

  // Set input values once singleCompany is fetched
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.name.trim()) {
      toast.error("Company name is required!");
      return; // Prevent form submission if name is empty
    }

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

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
    return <div>Loading...</div>; // Show loading until company data is available
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
