import { JobModel } from "../../models/job";
import {Request, Response} from "express"

export const deleteJob = async (req: Request<{"jobId"  : string}, {}, {}>, res: Response) => {
    const deletedJob = await JobModel.findByIdAndDelete(req.params.jobId);
    if (!deletedJob) {
        return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
};