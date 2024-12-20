import { createBrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";
import Jobs from "@/home/NavComponent/Jobs/Jobs";
import Browse from "@/home/NavComponent/Browse/Browse";
import Profile from "@/profile/Profile";
import JobsDescription from "@/home/NavComponent/Jobs/JobsDescription";

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
    element: <JobsDescription/>,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default appRoute;
