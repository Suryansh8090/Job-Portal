import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

 const isAuthenticated = asyncHandler(async (req, res, next) => {
 try {
     const token =
       req.cookies?.AccessToken ||
       req.header("Authorization")?.replace("Bearer ", "");
       //console.log("Token", token);
      
     if (!token) {
       throw new ApiError(401, "Unauthorized request!");
     }
   
     const decodedToken = await jwt.verify(
       token,
       process.env.ACCESS_TOKEN_SECRET
     );
   
     const user = await User.findById(decodedToken?._id).select(
       "-password "
     );
   
     if (!user) {
       throw new ApiError(401, "Invalid Access Token!");
     }
     req.user = user;
     next();
 } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token!");  
 }
});


export { isAuthenticated }