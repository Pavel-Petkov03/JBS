import { Request, Response } from 'express';
import {JobModel} from '../../models/job';
import { Types } from 'mongoose';

export const getAllJobs = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filters: any = {};
        
    if (req.query.search) {
        filters.$text = { $search: req.query.search as string };
    }
        
    if (req.query.jobType) {
        filters.jobType = req.query.jobType;
    }
        
    if (req.query.experienceLevel) {
        filters.experienceLevel = req.query.experienceLevel;
    }
        
    if (req.query.location) {
        filters.location = new RegExp(req.query.location as string, 'i');
    }
        
    if (req.query.company) {
        filters.company = new Types.ObjectId(req.query.company as string);
    }
        
    if (req.query.postedAfter) {
        filters.postedDate = { $gte: new Date(req.query.postedAfter as string) };
    }

    const jobs = await JobModel.find(filters)
        .populate('company', 'name logo')
        .skip(skip)
        .limit(limit)
        .sort({ postedDate: -1 });

    const total = await JobModel.countDocuments(filters);

    res.status(200).json({
        success: true,
        count: jobs.length,
        data: jobs,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    });
}