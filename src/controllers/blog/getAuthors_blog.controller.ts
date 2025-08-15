import { Request, Response } from 'express';
import { getBlogAuthorsService } from '../../helpers/services/blog.service';

// Lấy danh sách tác giả viết blog
export const getBlogAuthors = async (_req: Request, res: Response) => {
    try {
        const data = await getBlogAuthorsService();

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error: any) {
        console.error('API Error in GET /api/blog/authors:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};