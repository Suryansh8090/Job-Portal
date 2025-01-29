import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.models.js";
import { User } from "../models/user.models.js";
import { Types } from "mongoose";

const postJob = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      position,
      companyId,
      experience,
      jobType,
    } = req.body;
    const userId = req.user.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !position ||
      !companyId ||
      !experience ||
      !jobType
    ) {
      throw new ApiError(400, "Credentials are required!");
    }

    const createJob = await Job.create({
      title,
      description,
      location,
      salary: Number(salary),
      requirements: requirements.split(","),
      position,
      jobType,
      company: companyId,
      experienceLevel: experience,
      created_by: userId,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, createJob, "New job is created successfully!"));
  } catch (error) {
    console.error("Error creating job:", error);
    throw new ApiError(error.status || 500, error.message || "Job creation failed", error);
  }
});

const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    console.log("Search Keyword:", keyword);
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate('company');
    console.log("Jobs fetched:", jobs);
    if (!jobs || jobs.length === 0) {
      throw new ApiError(404, "No jobs found for the given keyword.");
    }

    return res.status(200).json(new ApiResponse(200, jobs, "Jobs retrieved successfully!"));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new ApiError(500, "Failed to retrieve jobs. Please try again later.", error);
  }
});

const getJobById = asyncHandler(async (req, res) => {
  try {
    const jobId = req.params.id;

     // Validate if jobId is a valid ObjectId
     if (!Types.ObjectId.isValid(jobId)) {
      throw new ApiError(400, "Invalid Job ID format.");
    }
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      throw new ApiError(404, "Job is not found!");
    }

    return res.status(200).json(new ApiResponse(200, job, "Job retrieved successfully!"));
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw new ApiError(500, "Failed to retrieve the job. Please try again later.", error);
  }
});

const getAllAdminPostedJobs = asyncHandler(async (req, res) => {
  try {
    const adminId = req.user.id;
    const allJobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 }); // Sort jobs by createdAt in descending order

    if (!allJobs || allJobs.length === 0) {
      throw new ApiError(404, "No jobs found for the admin.");
    }

    return res.status(200).json(new ApiResponse(200, allJobs, "Jobs retrieved successfully!"));
  } catch (error) {
    console.error("Error fetching admin jobs:", error);
    throw new ApiError(500, "Failed to retrieve admin jobs. Please try again later.", error);
  }
});


const deleteJob = asyncHandler(async (req, res) => {
  try {
    const jobId = req.params.id;

    // Validate if jobId is a valid ObjectId
    if (!Types.ObjectId.isValid(jobId)) {
      throw new ApiError(400, "Invalid Job ID format.");
    }

    // Delete the job from the database
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      throw new ApiError(404, "Job not found.");
    }

    return res.status(200).json(new ApiResponse(200, null, "Job deleted successfully!"));
  } catch (error) {
    console.error("Error deleting job:", error);
    throw new ApiError(500, "Failed to delete the job. Please try again later.", error);
  }
});

export { postJob, getAllJobs, getJobById, getAllAdminPostedJobs, deleteJob };
