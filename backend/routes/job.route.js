import express from "express";
import isAuthenticated from "../middlewares/isAuthenticate.js";
import {
  postJob,
  getAllJobs,
  getAdminJobs,
  getJobById,
} from "../controllers/job.controller.js";

const router = express.Router();

// POST JOB (ADMIN)
router.post("/post", isAuthenticated, postJob);

// GET ALL JOBS (STUDENT / SEARCH)
router.get("/get", isAuthenticated, getAllJobs);

// GET JOBS POSTED BY ADMIN
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

// GET JOB BY ID
router.get("/get/:jobId", isAuthenticated, getJobById);

export default router;
