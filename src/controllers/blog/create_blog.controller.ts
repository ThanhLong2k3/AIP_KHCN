import { Request, Response } from 'express';
import { verifyAuth } from '../../helpers/auth/auth.helper';
import { createBlogService } from '../../helpers/services/blog.service';

export const createBlog = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'BLOG_MANAGE');

        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Không có quyền tạo blog.',
            });
        }

        const model = req.body;
        const result = await createBlogService(model);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error('API Error in POST /api/blog/create:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
