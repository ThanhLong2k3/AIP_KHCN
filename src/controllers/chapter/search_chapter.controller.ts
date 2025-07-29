import { Request, Response } from 'express';
import { searchChapterService } from '../../helpers/services/chapter.service';

export const searchChapter = async (req: Request, res: Response) => {
    try {
        const model = req.body; // chứa các tiêu chí tìm kiếm như keyword, phân trang, subject_id,...
        const data = await searchChapterService(model);

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error: any) {
        console.error('API Error in POST /api/chapter/search:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
