import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  sendOtp,
  updateProfile
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { uploadFields } from "../middlewares/multer.js";


const router = Router()

router.route("/register").post(uploadFields, registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/profile/update").post(isAuthenticated, uploadFields, updateProfile)


// Forgot password routes
router.post("/forgot-password/send-otp", sendOtp);
router.post("/forgot-password/reset", resetPassword);


export default router