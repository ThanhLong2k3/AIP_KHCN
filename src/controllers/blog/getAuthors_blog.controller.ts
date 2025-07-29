import { Request, Response } from 'express';
import { verifyAuth } from '../../helpers/auth/auth.helper';
import { getBlogAuthorsService } from '../../helpers/services/blog.service';

// Lấy danh sách tác giả viết blog
export const getBlogAuthors = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'BLOG_MANAGE');

        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền truy cập.',
            });
        }

        const authors = await getBlogAuthorsService();

        return res.status(200).json({
            success: true,
            data: authors,
        });
    } catch (error: any) {
        console.error('API Error in GET /api/blog/authors:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
