import { createBrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";
import Jobs from "@/home/NavComponent/Jobs/Jobs";
import Browse from "@/home/NavComponent/Browse/Browse";
import Profile from "@/profile/Profile";
import JobsDescription from "@/home/NavComponent/Jobs/JobsDescription";
import Companies from "@/admin/Companies";
import CreateCompany from "@/admin/CreateCompany";
import CompanySetup from "@/admin/CompanySetup";
import AdminJobs from "@/admin/AdminJobs";
import PostJob from "@/admin/PostJob";
import Applicants from "@/admin/Applicants";


const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobsDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/companies",
    element: <Companies />,
  },
  {
    path: "/admin/companies/create",
    element: <CreateCompany />,
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup />,
  },
  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
  {
    path: "/admin/jobs/create",
    element: <PostJob />,
  },
  {
    path: "/admin/jobs/:id",
    element: <PostJob />,
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants/>
  }
]);

export default appRoute;
