import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Company } from "../models/company.models.js";
import  getDataUri  from "../utils/datauri.js"
import  cloudinary  from "../utils/cloudinary.js"


const registerCompany = asyncHandler(async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      throw new ApiError(400, "Company name is required");
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      throw new ApiError(409, "You can't register the same company!");
    }

    company = await Company.create({
      name: companyName,
      userId: req.user.id,
    });
    const companyId = company?._id;
    return res
      .status(201)
      .json(
        new ApiResponse(200, "Company registered successfully!", {
          _id: companyId,
          name: company.name,
        })
      );
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(error.statusCode, error.message));
    }
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
});

const updateCompany = asyncHandler(async (req, res) => {
  try {
    const { name, description, location, website } = req.body;
    
    const file = req.file;
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url

  // Check if the company name already exists (for a different company)
  if (name) {
    const existingCompany = await Company.findOne({ name });
    if (existingCompany && existingCompany._id.toString() !== req.params.id) {
      throw new ApiError(409, "Company name already exists!");
    }
  }
    // Prepare update data
    const updateData = { name, description, location, website, logo };
  
    // Find and update the company
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    // If no company was found and updated
    if (!company) {
      throw new ApiError(404, "Company not found!");
    }

    // Return success response
    return res
      .status(200)
      .json(new ApiResponse(200, "Company updated successfully", company));
  } catch (error) {
    console.log("Error updating company:", error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(error.statusCode, error.message));
    }
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
});

const getCompany = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      throw new ApiError(404, "No companies found!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Companies found successfully!", companies));
  } catch (error) {
    console.log("Error fetching companies:", error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(error.statusCode, error.message));
    }
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
});

const getCompanyById = asyncHandler(async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);
    if (!company) {
      throw new ApiError(404, "Company not found!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, company, "Company found by given ID"));
  } catch (error) {
    console.log("Error fetching company by ID:", error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(error.statusCode, error.message));
    }
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
});




export { registerCompany, getCompany, getCompanyById, updateCompany, };
