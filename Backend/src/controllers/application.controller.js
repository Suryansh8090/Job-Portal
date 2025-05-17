import { Application } from "../models/application.model.js";
import { Job } from "../models/job.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendStatusSMS } from "../utils/smsService.js";

const applyJob = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.id;

    if (!jobId) {
      throw new ApiError(405, "Job id is required!");
    }

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      throw new ApiError(400, "You have already applied for this job");
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, "Job not found!");
    }

    // Create the application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    }); // .sort({createdAt: -1})
    job.applications.push(newApplication._id);
    await job.save();

    return res
      .status(201)
      .json(new ApiResponse(201, "Job applied successfully!"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Job is not applied successfully!", error);
  }
});

const getAppliedJobs = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application || application.length === 0) {
      throw new ApiError(404, "No applications found!");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          application,
          "Applied jobs retrieved successfully!"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Failed to retrieve applied jobs.");
  }
});

const getApplicants = asyncHandler(async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      },
    });

    if (!job) {
      throw new ApiError(404, "Job not found!");
    }

    if (!job.applications || job.applications.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "No applicants found for this job."));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, job.applications, "Applicants found successfully!")
      );
  } catch (error) {
    console.log("error", error);

    throw new ApiError(404, "Failed to retrieve applicants.");
  }
});

const updateStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      throw new ApiError(404, "Status is required!");
    }

    const application = await Application.findOne({
      _id: applicationId,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .populate("applicant");

    console.log("Applicant:", application.applicant);

    if (!application) {
      throw new ApiError(404, "Application not found!");
    }

    const studentName =
      application.applicant.fullname || application.applicant.name || "Student";
    let phoneNumber = application.applicant.phoneNumber;

    if (!phoneNumber) {
      console.error("Applicant phone number missing!");
      throw new ApiError(
        400,
        "Applicant phone number is missing, cannot send SMS."
      );
    }

    // Normalize phone number to E.164 format (assuming default country code +91 for India)
    if (!phoneNumber.toString().startsWith("+")) {
      phoneNumber = "+91" + phoneNumber.toString();
    }

    // Update the status to lowercase to ensure consistency
    application.status = status.toLowerCase();
    application.statusSeen = false;
    application.statusChangedAt = new Date();
    await application.save();

    // ✅ Fetch job and company info for SMS
    const role = application.job?.title || "a position";
    const companyName = application.job?.company?.name || "the company";

    // ✅ Try sending SMS, but don’t fail status update if it errors
    try {
      await sendStatusSMS(
        phoneNumber,
        studentName,
        application.status,
        companyName,
        role
      );
      console.log("✅ SMS sent to:", phoneNumber);
    } catch (smsError) {
      console.error("⚠️ Failed to send SMS:", smsError.message);
      // You can optionally log this to a file or DB
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Status updated successfully!"));
  } catch (error) {
    console.log(error);

    throw new ApiError(400, "Failed to update the status.");
  }
});

const getUnseenStatusUpdates = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  if (role !== "student") {
    // either return an empty array or a 403; here’s an empty-array approach
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No updates for recruiters"));
  }
  const applications = await Application.find({
    applicant: userId,
    statusSeen: false,
  }).populate({
    path: "job",
    populate: { path: "company" },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, applications, "Unseen application updates fetched")
    );
});

const markApplicationsAsSeen = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  await Application.updateMany(
    { applicant: userId, statusSeen: false },
    { $set: { statusSeen: true } }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Marked applications as seen"));
});

const getApplicationStatus = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.jobId;

  if (!jobId) {
    throw new ApiError(400, "Job ID is required");
  }

  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { isApplied: !!existingApplication }, "Application status fetched"));
});


export {
  applyJob,
  getApplicants,
  getAppliedJobs,
  getUnseenStatusUpdates,
  markApplicationsAsSeen,
  updateStatus,
  getApplicationStatus,
};
