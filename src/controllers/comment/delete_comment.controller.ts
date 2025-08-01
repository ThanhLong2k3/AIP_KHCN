import { Request, Response } from 'express';
import { deleteCommentService } from '../../helpers/services/comment.service';

export const deleteComment = async (req: Request, res: Response) => {
    try {

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
