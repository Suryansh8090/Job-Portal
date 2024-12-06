import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";

const app = express();

// Corrected CORS options
const corsOption = {
  origin: "http://localhost:5173", // Fixed URL
  credentials: true, // Correct key
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mounting the user routes
app.use("/api/v1/user", userRouter);

export { app };
