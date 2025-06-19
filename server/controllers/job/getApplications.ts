import { Request, Response } from 'express';
import {ApplicationModel} from '../../models/application';

export const getAllApplications = async (req: Request, res: Response) => {
    const filters: any = {};

    if (req.query.status) {
        filters.status = req.query.status;
    }
    if (req.params.jobId) {
        filters.job = req.params.jobId;
    }

    const applications = await ApplicationModel.find(filters)
        .populate('candidate', 'name email')
        .populate({
            path: 'job',
            select: 'title company',
            populate: {
                path: 'company',
                select: 'name'
            }
        })
        .sort('-submissionDate');

    res.status(200).json({ applications });
};
