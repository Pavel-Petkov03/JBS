import express from "express"
import hasRoles from "../middlewares/hasRole";
import UserRole from "../types/auth/roleTypes";
import { getAllJobs } from "../controllers/job/getJobs";
import { getJob } from "../controllers/job/getJob";
import { createJob } from "../controllers/job/createJob";
import { updateJob } from "../controllers/job/updateJob";
import { deleteJob } from "../controllers/job/deleteJob";
import { getAllApplications } from "../controllers/job/getApplications";
import employerInCompany from "../middlewares/employerInCompany";
import { createApplication } from "../controllers/job/createApplication";
import { uploadResumeMiddleware } from "../middlewares/upload";
import { getApplication } from "../controllers/job/getApplication";
import { deleteApplication } from "../controllers/job/deleteApplication";

const router = express.Router();

router.get("/", getAllJobs);
router.post("/", hasRoles([UserRole.Employer]), employerInCompany, createJob);

router.get("/:jobId", getJob);
router.put("/:jobId", hasRoles([UserRole.Employer]) ,employerInCompany, updateJob);
router.delete("/:jobId", hasRoles([UserRole.Employer]) ,employerInCompany, deleteJob);

router.get("/:jobId/applications", hasRoles([UserRole.Employer]) ,employerInCompany, getAllApplications);
router.post("/:jobId/applications", hasRoles([UserRole.Candidate]), uploadResumeMiddleware, createApplication);

router.get("/:jobId/applications/:applicationId", employerInCompany, getApplication);
router.delete("/:jobId/applications/:applicationId", hasRoles([UserRole.Candidate]), deleteApplication);

export default router