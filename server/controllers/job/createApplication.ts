import { Response } from 'express';
import { ApplicationModel } from '../../models/application';
import {JobModel} from '../../models/job';
import { uploadResume } from '../../config/cloudinary';
import { FileUploadRequest } from '../../types/fileRequest';


export const createApplication = async (req: FileUploadRequest , res: Response) => {
    const { jobId } = req.params;

    const job = await JobModel.findById(jobId);
    if (!job || !req.user) {
      return res.status(404).json({ 
        success: false,
        error: 'Job not found' 
      });
    }
    const existingApp = await ApplicationModel.findOne({ 
      job: jobId, 
      candidate: req.user._id
    });
    if (existingApp) {
      return res.status(409).json({
        success: false,
        error: 'Already applied to this job',
        applicationId: existingApp._id
      });
    }

    const uploadResult = await uploadResume(req.file.buffer);

    const application = await ApplicationModel.create({
      job: jobId,
      candidate : req.user._id,
      resumeUrl: uploadResult.url,
      resumePublicId: uploadResult.publicId,
      status: 'Pending'
    });

    return res.status(201).json({
      success: true,
      data: {
        id: application._id,
        job: application.job,
        status: application.status,
        resumeUrl: application.resumeUrl,
        publicId: application.resumePublicId
      }
    });
};
