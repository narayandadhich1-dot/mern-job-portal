import express from "express";
import isAuthenticated from "../middlewares/isAuthenticate.js";
import {
  postJob,
  getAllJobs,
  getAdminJobs,
  getJobById,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);

router.get("/get", isAuthenticated, getAllJobs);

router.get("/getadminjobs", isAuthenticated, getAdminJobs);

router.get("/get/:jobId", isAuthenticated, getJobById);

export default router;
