import { Request, Response } from 'express';
import { resetPasswordService } from '../../helpers/services/account.service';

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, newPassword } = req.body;

        const result = await resetPasswordService(email, newPassword);

        return res.status(200).json(result);
    } catch (err: any) {
        console.error('Lỗi API đặt lại mật khẩu:', err);
        return res.status(400).json({
            success: false,
            message: err.message || 'Không thể đặt lại mật khẩu.',
        });
    }
};
