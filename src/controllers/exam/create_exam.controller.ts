import { Request, Response } from 'express';
import { createExamService } from '../../helpers/services/exam.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const createExam = async (req: Request, res: Response) => {
    try {
        // Xác thực token với quyền EXAM_MANAGE
        const authResult = await verifyAuth(req, 'EXAM_MANAGE');
        if (authResult.error) return res.status(401).json(authResult.error);

        const model = req.body;
        const result = await createExamService(model);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error: any) {
        console.error('API Error in POST /api/exam/create:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
