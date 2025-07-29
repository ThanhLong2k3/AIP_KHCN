import { Request, Response } from 'express';
import { verifyAuth } from '../../helpers/auth/auth.helper';
import { createAccountService } from '../../helpers/services/account.service';


// Tạo tài khoản
export const createAccount = async (req: Request, res: Response) => {
    try {
        // Kiểm tra quyền (ACCOUNT_MANAGE)
        const authResult = await verifyAuth(req, 'ACCOUNT_MANAGE');

        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền thực hiện chức năng này.',
            });
        }

        const model = req.body;
        const result = await createAccountService(model);

        return res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        console.error('API Error in POST /api/account/create:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
