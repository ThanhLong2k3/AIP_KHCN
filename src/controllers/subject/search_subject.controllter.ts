// src/controllers/subject.controller.ts

import { Request, Response } from 'express';
import { searchSubjectService } from '../../helpers/services/subject.service';

export const searchSubject = async (req: Request, res: Response) => {
    try {
        const model = req.body; // chứa: từ khóa, phân trang, người tạo, v.v.
        const data = await searchSubjectService(model);

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error: any) {
        console.error('API Error in POST /api/subject/search:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
