import { Request, Response } from 'express';
import { searchCommentService } from '../../helpers/services/comment.service';
import { verifyAuth } from '@/helpers/auth/auth.helper';

export const searchComment = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req);
        if (authResult.error) {
            return res.status(authResult.error.status || 401).json({
                success: false,
                message: authResult.error.message || 'Xác thực không thành công.',
            });
        }

        const model = req.body; // lấy dữ liệu tìm kiếm từ body
        const data = await searchCommentService(model);

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
