import { verifyAuth } from '@/helpers/auth/auth.helper';
import { verifyCurrentPasswordService } from '../../helpers/services/account.service';
import { Request, Response } from 'express';

export const verifyPassword = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req); // KHÔNG truyền mã quyền, chỉ xác thực người dùng
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền thực hiện chức năng này.',
            });
        }
        const { username } = authResult.user; // Lấy username từ token
        const { currentPassword } = req.body;
        const result = await verifyCurrentPasswordService(username, currentPassword);

        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
