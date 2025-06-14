import express from "express"
import hasRoles from "../middlewares/hasRole";
import UserRole from "../types/auth/roleTypes";

const router = express.Router()

// router.get("/"); works with filters
router.post("/");

router.get("/:jobId");
router.put("/:jobId", hasRoles([UserRole.Employer, UserRole.Admin]));
router.delete("/:jobId", hasRoles([UserRole.Employer, UserRole.Admin]));

router.get("/:jobId/applications", hasRoles([UserRole.Employer, UserRole.Admin]));
router.post("/:jobId/applications", hasRoles([UserRole.Employer, UserRole.Admin]));

export default router