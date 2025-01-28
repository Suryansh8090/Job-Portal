import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  postJob,
  getAllJobs,
  getJobById,
  getAllAdminPostedJobs,
} from "../controllers/job.controller.js";

const router = Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAllAdminPostedJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
