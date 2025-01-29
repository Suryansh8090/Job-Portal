import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


const generateAccessToken = async function (userId) {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    await user.save({ validateBeforeSave: false });
    return { accessToken };
  } catch (error) {
    throw new ApiError(500, "Error generating access token.");
  }
};



const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, phoneNumber, password, role } = req.body;

  if (!fullname || !email || !phoneNumber || !password || !role) {
    throw new ApiError(400, "Missing user credentials.");
  }



  // Validate email format using a regex pattern
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format.");
  }
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this email.");
  }

  const user = new User({
    fullname,
    email,
    phoneNumber,
    password,
    role,
  });

  // Handle profile photo upload if present
  if (req.files?.profilePhoto?.[0]) {
    const profilePhoto = req.files.profilePhoto[0];
    const photoUri = getDataUri(profilePhoto);
    const photoCloud = await cloudinary.uploader.upload(photoUri.content, {
      folder: "user_profile_photos",
      public_id: `profilePhoto_${user._id}`,
    });
    user.profile.profilePhoto = photoCloud.secure_url;
  }

  // Save user to the database
  await user.save();

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Error registering the user.");
  }


  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, role, password } = req.body;

  if (!email || !password || !role) {
    throw new ApiError(400, "Missing login credentials.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password.");
  }

  if (role !== user.role) {
    throw new ApiError(403, "Role mismatch for this account.");
  }

  // Generate access token
  const { accessToken } = await generateAccessToken(user._id);
  const loggedInUser = await User.findById(user._id).select("-password");

  // Send response with user details and token
  return res.status(200).json({
    success: true,
    message: "User logged in successfully.",
    user: loggedInUser,
    accessToken, // Ensure accessToken is part of the response
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user_id,
    {
      $set: {
        accessToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  //  COOKIES
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out successfully!"));
});

const updateProfile = asyncHandler(async (req, res) => {
  try {
    //  console.log("Multer Files:", req.files); // Log the files received from multer

    const { fullname, email, phoneNumber, bio, skills } = req.body;
    // console.log(fullname, email,  phoneNumber, bio, skills);

    const userId = req.user._id;
    let user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    if (skills) {
      user.profile.skills = Array.isArray(skills)
        ? skills
        : typeof skills === "string"
        ? skills.split(",").map((skill) => skill.trim())
        : user.profile.skills;
    }

    // Handle profile photo upload
    if (req.files?.profilePhoto?.[0]) {
      const profilePhoto = req.files.profilePhoto[0];
      const photoUri = getDataUri(profilePhoto);
      const photoCloud = await cloudinary.uploader.upload(photoUri.content, {
        folder: "user_profile_photos",
        public_id: `profilePhoto_${user._id}`,
      });
      user.profile.profilePhoto = photoCloud.secure_url;
    }

    // Handle resume upload
    if (req.files?.resume?.[0]) {
      const resume = req.files.resume[0];
      const resumeUri = getDataUri(resume);
      const resumeCloud = await cloudinary.uploader.upload(resumeUri.content, {
        folder: "user_resumes",
        public_id: `resume_${user._id}`,
      });
      user.profile.resume = {
        url: resumeCloud.secure_url,
        originalName: resume.originalname,
      };
    }

    await user.save();
    // console.log(user);

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile updated successfully!"));
  } catch (error) {
    console.log("Update Profile failed:", error);
    throw new ApiError(500, "Profile update failed!");
  }
});

export { registerUser, loginUser, logoutUser, updateProfile };
