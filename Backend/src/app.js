import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js"

const app = express();

//  CORS options
const corsOption = {
  origin: "http://localhost:5173", 
  credentials: true, 
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mounting the user routes
app.use("/api/v1/user", userRouter);
app.use("/api/v2/company", companyRouter)
export { app };
