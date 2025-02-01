import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js"
import jobRouter from "./routes/job.route.js"
import applicationRouter from "./routes/application.route.js"
import { ApiError } from "./utils/ApiError.js";

const app = express();

//  CORS options
const corsOption = {
  origin: ['http://localhost:5173', 'http://192.168.1.7:5173'], 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mounting the user routes
app.use("/api/v1/user", userRouter);
app.use("/api/v2/company", companyRouter)
app.use("/api/v3/job", jobRouter)
app.use("/api/v4/application", applicationRouter)

// Global error handling middleware (ensure this is included in your app.js or server.js)
app.use((err, req, res, next) => {
  console.error(err.stack); // For debugging in development

  // Check if it's an instance of ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack in development
    });
  }

  // For unhandled errors, return a generic 500 error
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export { app };
