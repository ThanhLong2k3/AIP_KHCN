// src/controllers/lesson.controller.ts

import { Request, Response } from 'express';
import { createLessonService } from '../../helpers/services/lesson.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const createLesson = async (req: Request, res: Response) => {
    try {
        // Xác thực token với quyền LESSON_MANAGE
        const authResult = await verifyAuth(req, 'LESSON_MANAGE');
        if (authResult.error) return res.status(401).json(authResult.error);

        const model = req.body;
        const result = await createLessonService(model);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error: any) {
        console.error('API Error in POST /api/lesson/create:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
