import { createBrowserRouter } from "react-router-dom";
import Home from "../home/home";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";




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
    
])

export default appRoute;