import { Request, Response } from 'express';
import { createCommentService } from '../../helpers/services/comment.service';

export const createComment = async (req: Request, res: Response) => {
    try {
        const model = req.body;
        const result = await createCommentService(model);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error('API Error in POST /api/comment/create:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
