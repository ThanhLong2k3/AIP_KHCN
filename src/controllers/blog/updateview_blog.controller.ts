import { addBlogViewService } from '@/helpers/services/blog.service';
import { Request, Response } from 'express';

export const addBlogView = async (req: Request, res: Response) => {
    try {
        const { blog_id } = req.body;

        if (!blog_id) {
            return res.status(400).json({
                success: false,
                message: "Thiếu ID của bài viết."
            });
        }

        addBlogViewService(blog_id);

        return res.status(202).json({
            success: true,
            message: "Yêu cầu ghi nhận lượt xem đã được chấp nhận."
        });

    } catch (error: any) {
        console.error('Controller Error - addBlogView:', error);

        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ khi xử lý yêu cầu.'
        });
    }
};