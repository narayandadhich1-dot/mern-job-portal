import { Job } from "../models/job.models.js";
import {  Company  } from "../models/company.model.js";

export const postJob = async (req, res) => {
  try {
    
     
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

     console.log("USER ID:", req.id);
      console.log("Salary:", salary);
console.log("Experience:", experience);
console.log("Position:", position);


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
    const job = await Job.create({
      title,
      description,
      location,
      jobType,
      
      requirements: Array.isArray(requirements) ? requirements : requirements.split(",").map(item => item.trim()),
      salary: Number(salary),
      experienceLevel: Number(experience), 
      position: Number(position),          
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
    console.error("Post Job Error Detailed:", error); 
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
    const matchedCompanies = await Company.find({
      name: { $regex: keywords, $options: "i" },
    }).select("_id");

    const companyIds = matchedCompanies.map((company) => company._id);

    const query = {
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
        { company: { $in: companyIds } }, 
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

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Get Jobs Error:", error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};


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
