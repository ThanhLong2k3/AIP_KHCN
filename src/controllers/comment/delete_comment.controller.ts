import { Request, Response } from 'express';
import { deleteCommentService } from '../../helpers/services/comment.service';
import { verifyAuth } from '@/helpers/auth/auth.helper';

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req);
        if (authResult.error) {
            return res.status(authResult.error.status || 401).json({
                success: false,
                message: authResult.error.message || 'Xác thực không thành công.',
            });
        }

        const { id } = req.body;
        const result = await deleteCommentService(id);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
