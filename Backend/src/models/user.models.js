import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String, default: "" },
      skills: [{ type: String }],
      resume: { 
        url: { type: String }, // Store the URL of the resume
        originalName: { type: String }, // Store the original file name
      },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

//                 PASSWORD ENCRYPTION!
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Check password is matched or not!
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT:- Bearer Token
userSchema.methods.generateAccessToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        phoneNumber: this.phoneNumber,
        fullname: this.fullname,
        role: this.role,
      },
      process.env.ACCESS_TOKEN_SECRET, // Check for the correct secret
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "2d",
      }
    );
  } catch (error) {
    console.log("Error generating JWT:", error);
    throw new Error("Error generating access token");
  }
};
export const User = mongoose.model("User", userSchema);
