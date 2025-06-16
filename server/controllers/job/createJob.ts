import { Request, Response } from 'express';
import {JobModel, IJob} from '../../models/job';

export const createJob = async (req: Request<{}, {}, IJob>, res: Response) => {
    const { 
        title, 
        description, 
        salaryRange, 
        jobType, 
        company, 
        location, 
        requirements, 
        experienceLevel, 
        benefits, 
        tags 
    } = req.body;

    const newJob = new JobModel({
            title,
            description,
            salaryRange,
            jobType,
            company,
            location,
            requirements: requirements || [],
            experienceLevel,
            postedDate: new Date(),
            benefits: benefits || [],
            tags: tags || []
        });

        await newJob.save();
        res.status(201).json(newJob);
};