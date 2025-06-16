import { JobModel } from "../../models/job";
import {Request, Response} from "express"

export const deleteJob = async (req: Request, res: Response) => {
    const deletedJob = await JobModel.findByIdAndDelete(req.params.jobId);
    if (!deletedJob) {
       res.status(404).json({ message: 'Job not found' });
       return
    }
    res.status(200).json({ message: 'Job deleted successfully' });
};