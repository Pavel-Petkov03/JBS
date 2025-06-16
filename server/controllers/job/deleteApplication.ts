import { Response } from 'express';
import {ApplicationModel} from '../../models/application';
import { AuthRequest } from '../../types/auth/authenticateTokens';
import { cloudinary } from '../../config/cloudinary';
export const deleteApplication = async (req: AuthRequest, res: Response) => {
    const { applicationId } = req.params;

    const deleted = await ApplicationModel.findOneAndDelete({ _id: applicationId , candidate : req.user?.id});

    if (!deleted) {
        res.status(404).json({ message: 'Application not found' });
        return
    }

    if (deleted.resumePublicId) {
        await cloudinary.uploader.destroy(deleted.resumePublicId);
    }
    res.sendStatus(204);
};