import { Request, Response } from 'express';
import { verifyAuth } from '../../helpers/auth/auth.helper';
import { updateBlogService } from '../../helpers/services/blog.service';

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'BLOG_MANAGE');

        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Không có quyền cập nhật blog.',
            });
        }

        const model = req.body;
        const result = await updateBlogService(model);

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
