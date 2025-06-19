import { Response } from 'express';
import { ApplicationModel } from '../../models/application';
import {JobModel} from '../../models/job';
import { uploadResume } from '../../config/cloudinary';
import { FileUploadRequest } from '../../types/fileRequest';


export const createApplication = async (req: FileUploadRequest , res: Response) => {
    const { jobId } = req.params;
    if(!req.file){
        res.status(404).json({ 
        error: 'Image cannot be created' 
      });
      return;
    }
    const job = await JobModel.findById(jobId);
    if (!job || !req.user) {
      res.status(404).json({ 
        error: 'Job not found' 
      });
      return;
    }
    const existingApp = await ApplicationModel.findOne({ 
      job: jobId, 
      candidate: req.user._id
    });
    if (existingApp) {
      res.status(404).json({
        error: 'Already applied to this job',
        applicationId: existingApp._id
      });
      return;
    }

    const uploadResult = await uploadResume(req.file.buffer);

    const application = await ApplicationModel.create({
      job: jobId,
      candidate : req.user._id,
      resumeUrl: uploadResult.url,
      resumePublicId: uploadResult.publicId,
      status: 'Pending'
    });

    res.status(201).json(application);
};
