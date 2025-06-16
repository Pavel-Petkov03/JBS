import { Response } from 'express';
import {ApplicationModel} from '../../models/application';
import { AuthRequest } from '../../types/auth/authenticateTokens';
import { cloudinary } from '../../config/cloudinary';
export const deleteApplication = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const query = { _id: id };

    const deleted = await ApplicationModel.findOneAndDelete(query);

    if (!deleted) {
        return res.status(404).json({ message: 'Application not found' });
    }

    if (deleted.resumePublicId) {
        await cloudinary.uploader.destroy(deleted.resumePublicId);
    }
    res.sendStatus(204);
};