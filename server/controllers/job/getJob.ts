import { Request, Response } from "express";
import { JobModel } from "../../models/job";
export const getJob = async (req: Request, res: Response) => {
    const job = await JobModel.findById(req.params.jobId).populate('company');
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
};