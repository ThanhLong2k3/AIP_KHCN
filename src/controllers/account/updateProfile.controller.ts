import { verifyAuth } from '@/helpers/auth/auth.helper';
import { updateProfileService } from '@/helpers/services/account.service';
import { Request, Response } from 'express';

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req); // KHÔNG truyền mã quyền, chỉ xác thực người dùng
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền thực hiện chức năng này.',
            });
        }
        const { username } = authResult.user; // Lấy username từ token
        const { model } = req.body;
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
