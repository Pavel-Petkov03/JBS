import {Request, Response} from "express"
import { IJob, JobModel } from "../../models/job";
import { AuthRequest } from "../../types/auth/authenticateTokens";

type PartialJob = Omit<IJob, 'postedDate' | 'company'>;

export const updateJob = async (req: AuthRequest, res: Response) => {
    const { jobId } = req.params;
    const updateData = req.body;

    const updatedJob = await JobModel.findByIdAndUpdate(
        jobId,
        updateData,
        { new: true, runValidators: true }
    ).populate('company');

    if (!updatedJob) {
        res.status(404).json({ message: 'Job not found' });
        return
    }

    res.status(200).json(updatedJob);
};