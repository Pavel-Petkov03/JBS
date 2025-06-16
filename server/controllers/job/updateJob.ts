import {Request, Response} from "express"
import { IJob, JobModel } from "../../models/job";

type PartialJob = Omit<IJob, 'postedDate' | 'company'>;

export const updateJob = async (req: Request<{"jobId" : string}, {}, PartialJob>, res: Response) => {
    const { jobId } = req.params;
    const updateData = req.body;

    const updatedJob = await JobModel.findByIdAndUpdate(
        jobId,
        updateData,
        { new: true, runValidators: true }
    ).populate('company');

    if (!updatedJob) {
        return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(updatedJob);
};