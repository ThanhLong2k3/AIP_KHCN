import { verifyCurrentPasswordService } from '@/helpers/services/account.service';
import { Request, Response } from 'express';

export const verifyPasswordController = async (req: Request, res: Response) => {
    try {
        const { username, currentPassword } = req.body;
        const result = await verifyCurrentPasswordService(username, currentPassword);

        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
