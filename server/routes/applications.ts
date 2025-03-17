import express from "express"

const router = express.Router()

router.get("/:appId");
router.post("/:appId");
router.put("/:appId");


export default router