import { Request, Response } from "express";
import { JobModel } from "../../models/job";
export const getJob = async (req: Request<{"jobId" : string}, {}, {}>, res: Response) => {
    const job = await JobModel.findById(req.params.jobId).populate('company');
    if (!job) {
        res.status(404).json({ message: 'Job not found' });
        return;
    }
    res.status(200).json(job);
};