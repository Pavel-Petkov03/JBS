import express from "express"
import { getAllCompanies } from "../controllers/company/getAllCompanies";
import { getCompany } from "../controllers/company/getCompany";

const router = express.Router()

router.get("/", getAllCompanies);
router.get("/:companyId", getCompany);
router.get("/:companyId/jobs");

export default router




