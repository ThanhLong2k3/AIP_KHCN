import { Request, Response } from 'express';
import { verifyAuth } from '../../helpers/auth/auth.helper';
import { searchAccountService } from '../../helpers/services/account.service';

// Tìm kiếm tài khoản
export const searchAccount = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'ACCOUNT_MANAGE');

        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền tìm kiếm tài khoản.',
            });
        }

        const model = req.body;
        const data = await searchAccountService(model);

        return res.status(200).json({
            success: true,
            message: 'Tìm kiếm tài khoản thành công.',
            data,
        });
    } catch (error: any) {
        console.error('[API_SEARCH_ACCOUNT_ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Đã có lỗi xảy ra trong quá trình tìm kiếm.',
        });
    }
};
