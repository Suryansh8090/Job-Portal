import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateProfile 
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { singleUpload } from "../middlewares/multer.js";

const router = Router()

router.route("/register").post(singleUpload, registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile)



export default router