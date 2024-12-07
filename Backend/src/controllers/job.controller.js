import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.models.js";
import { User } from "../models/user.models.js";

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
      jobType
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
      throw new ApiError(400, "Credentials is required!");
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
      .json(
        new ApiResponse(201, createJob, "New job is created successfully!")
      );
  } catch (error) {
    console.error("Error creating job:", error);
    throw new ApiError(
      error.status || 500,
      error.message || "Job creation failed",
      error
    );
  }
});

const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query);

    if (!jobs) {
      throw new ApiError("No jobs found for the given keyword");
    }
    // jobs.length ? "Jobs retrieved successfully!" : "No jobs found for the given keyword"

    return res.status(200).json(new ApiResponse(200, jobs));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new ApiError(
      500,
      "Failed to retrieve jobs. Please try again later.",
      error
    );
  }
});

const getJobById = asyncHandler(async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, "Job is not found!");
    }
    return res
      .status(200)
      .json(new ApiResponse(401, job, "Job retrieved successfully!"));
  } catch (error) {
    onsole.error("Error fetching job by ID:", error);
    throw new ApiError(
      500,
      "Failed to retrieve the job. Please try again later.",
      error
    );
  }
});

const getAllAdminPostedJobs  = asyncHandler(async(req, res) => {
  try {
    const adminId = req.user.id
    const allJobs = await Job.find({created_by: adminId})
    if (!allJobs) {
      throw new ApiError(404, "Jobs are not found!")
    }
    return res.status(200)
    .json( new ApiResponse(401, allJobs, "Jobs are found",))
  } catch (error) {
    throw new ApiError(404, "get All Admin Posted Jobs are failed!", error)
  }
})



export { postJob, getAllJobs, getJobById, getAllAdminPostedJobs };
