import { Request, Response } from 'express';
import { verifyAuth } from '../../helpers/auth/auth.helper';
import { updateAccountService } from '../../helpers/services/account.service';

// Cập nhật tài khoản
export const updateAccount = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'ACCOUNT_MANAGE');

        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền cập nhật tài khoản.',
            });
        }

        const model = req.body;
        const result = await updateAccountService(model);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error('API Error in POST /api/account/update:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
