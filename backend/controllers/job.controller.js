import { Job } from "../models/job.models.js";

// POST JOB (ADMIN)
export const postJob = async (req, res) => {
  try {
    
      console.log("USER ID:", req.id);
    const {
      title,
      description,
      location,
      requirements,
      jobType,
      salary,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !location ||
      !requirements ||
      !jobType ||
      !salary ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });

    }

    // Explicitly convert types to match your Schema
    const job = await Job.create({
      title,
      description,
      location,
      jobType,
      // Convert string requirements to an array if it's sent as "node, react, css"
      requirements: Array.isArray(requirements) ? requirements : requirements.split(",").map(item => item.trim()),
      salary: Number(salary),
      experienceLevel: Number(experience), // Fixed: Convert to Number
      position: Number(position),          // Fixed: Convert to Number
      company: companyId,
      createdBy: userId,
    });

    const populatedJob = await Job.findById(job._id).populate({
      path: "company",
    });

    return res.status(201).json({
      message: "Job posted successfully",
      job: populatedJob,
      success: true,
    });
  } catch (error) {
    console.error("Post Job Error Detailed:", error); // This will show exactly what field failed in your terminal
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const keywords = req.query.keywords || "";
    const location = req.query.location || "";
    const industry = req.query.industry || "";
    const salaryRange = req.query.salary || ""; 

    const query = {
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
      ],
    };

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (industry) {
      query.requirements = { $regex: industry, $options: "i" };
    }

    if (salaryRange) {
      const [min, max] = salaryRange.split("-").map(Number);

      if (!isNaN(min) && !isNaN(max)) {
        query.salary = { $gte: min, $lte: max };
      } else if (!isNaN(min)) {
        query.salary = { $gte: min };
      }
    }

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// GET JOB BY ID

export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId)
      .populate("company")
      .populate("createdBy", "name email")
      .populate("applications");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

// GET JOBS POSTED BY ADMIN
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ createdBy: adminId }).populate("company");

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found for this admin",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
