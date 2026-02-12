import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";

dotenv.config();

const app = express();

/* ================= CORS (must be FIRST) ================= */
app.use(
  cors({
    origin: true, // allow all origins (good for Vercel + Render)
    credentials: true,
  })
);

/* ================= Middlewares ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ================= Test Route ================= */
app.get("/home", (req, res) => {
  return res.status(200).json({ message: "Backend is working fine" });
});

/* ================= Routes ================= */
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

/* ================= DB + Server ================= */
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
