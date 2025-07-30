import { updateProfileService } from '@/helpers/services/account.service';
import { Request, Response } from 'express';

export const updateProfileController = async (req: Request, res: Response) => {
    try {
        const { username, model } = req.body;
        const result = await updateProfileService(username, model);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
