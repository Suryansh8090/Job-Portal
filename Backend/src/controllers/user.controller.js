import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";


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

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this email.");
  }

  const user = await User.create({
    fullname,
    email,
    phoneNumber,
    password,
    role,
  });
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
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out successfully!"));
});

const updateProfile = asyncHandler(async (req, res) => {
  try {
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

    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile updated successfully!"));
  } catch (error) {
    console.log("Update Profile failed:", error);
    throw new ApiError(500, "Profile update failed!");
  }
});

export { registerUser, loginUser, logoutUser, updateProfile };
