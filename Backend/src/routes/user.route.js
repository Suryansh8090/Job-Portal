import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateProfile 
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/profile/update").post(isAuthenticated, updateProfile)



export default router