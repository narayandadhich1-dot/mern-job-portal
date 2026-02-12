import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";


dotenv.config({});

const app = express();

app.get("/home", (req, res) => {
  return res.status(200).json({ message: "Backend is working fine" }); 
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: [
        "http://localhost:5173", 
        "https://mern-job-portal-sepia.vercel.app",
        "https://mern-job-portal-git-main-narayan-dadhichs-projects.vercel.app"
    ],
    credentials: true,
};

const PORT = process.env.PORT || 3000;

//api's

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
