import { createBrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";
import Jobs from "@/home/NavComponent/Jobs/Jobs";




const appRoute = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/login',
        element: < Login/>
    },
    {
        path: '/signup',
        element: <Signup/>
    },
    {
        path:'/jobs',
        element: <Jobs/>
    }

    
])

export default appRoute;