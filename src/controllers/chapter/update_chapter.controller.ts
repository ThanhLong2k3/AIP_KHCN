import { Request, Response } from 'express';
import { verifyAuth } from '../../helpers/auth/auth.helper';
import { updateChapterService } from '../../helpers/services/chapter.service';

export const updateChapter = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'CHAPTER_MANAGE');

        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Không có quyền cập nhật chương.',
            });
        }

        const model = req.body;
        const result = await updateChapterService(model);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error: any) {
        console.error("API Error in POST /api/chapter/update:", error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ'
        });
    }
};
