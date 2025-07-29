import { Request, Response } from 'express';
import { verifyAuth } from '../../helpers/auth/auth.helper';
import { deleteChapterService } from '../../helpers/services/chapter.service';

export const deleteChapter = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'CHAPTER_MANAGE');

        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Không có quyền xoá chương.',
            });
        }

        const { id, deleted_by } = req.body;
        const result = await deleteChapterService(id, deleted_by);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error: any) {
        console.error("API Error in POST /api/chapter/delete:", error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ'
        });
    }
};
