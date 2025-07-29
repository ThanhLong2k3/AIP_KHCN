// src/controllers/lesson.controller.ts

import { Request, Response } from 'express';
import { searchLessonService } from '../../helpers/services/lesson.service';

export const searchLesson = async (req: Request, res: Response) => {
    try {
        const model = req.body;
        const data = await searchLessonService(model);

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error: any) {
        console.error('API Error in POST /api/lesson/search:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
