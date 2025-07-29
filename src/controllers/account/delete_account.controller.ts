import { Request, Response } from 'express';
import { verifyAuth } from '../../helpers/auth/auth.helper';
import { deleteAccountService } from '../../helpers/services/account.service';

// Xoá tài khoản
export const deleteAccount = async (req: Request, res: Response) => {
    try {
        // Xác thực quyền
        const authResult = await verifyAuth(req, 'ACCOUNT_MANAGE');

        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền xoá tài khoản.',
            });
        }

        const { username, deleted_by } = req.body;

        const result = await deleteAccountService(username, deleted_by);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error('API Error in POST /api/account/delete:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
