import express from "express";
import isAuthenticated from "../middlewares/isAuthenticate.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controllers.js";
import {singleUpload } from "../middlewares/multer.js"

const router = express.Router();

router.route("/register").post( isAuthenticated ,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:companyId").get(isAuthenticated,getCompanyById);
router.route("/update/:companyId").put(isAuthenticated,singleUpload,updateCompany);

export default router;
 