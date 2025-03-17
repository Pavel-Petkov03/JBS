import express from "express"

const router = express.Router()

router.get("/");
router.post("/");

router.get("/:companyId");
router.post("/:companyId");
router.put("/:companyId");

router.get("/:companyId/jobs");

export default router




