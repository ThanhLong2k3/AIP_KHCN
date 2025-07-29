// src/controllers/lesson.controller.ts

import { Request, Response } from 'express';
import { updateLessonService } from '../../helpers/services/lesson.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const updateLesson = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'LESSON_MANAGE');
        if (authResult.error) return res.status(401).json(authResult.error);

        const model = req.body;
        const result = await updateLessonService(model);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error: any) {
        console.error('API Error in POST /api/lesson/update:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
