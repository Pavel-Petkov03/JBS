import express from "express"
import hasRoles from "../middlewares/hasRole";

const router = express.Router()

// router.get("/"); works with filters
router.post("/");

router.get("/:jobId");
router.put("/:jobId", hasRoles(["Employer"]));
router.delete("/:jobId", hasRoles(["Employer"]));

router.get("/:jobId/applications");
router.post("/:jobId/applications");

export default router