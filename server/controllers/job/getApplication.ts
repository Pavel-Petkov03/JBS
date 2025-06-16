import { Request, Response } from "express";
import {ApplicationModel} from "../../models/application"

export const getJobApplication = async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const applications = await ApplicationModel.find({ job: jobId })
        .populate('candidate')
        .sort({ submissionDate: -1 });

    res.json({
        applications,
        count: applications.length
    });
};