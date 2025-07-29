import { Request, Response } from 'express';
import { updateExamService } from '../../helpers/services/exam.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const updateExam = async (req: Request, res: Response) => {
    try {
        // Kiểm tra xác thực + phân quyền
        const authResult = await verifyAuth(req, 'EXAM_MANAGE');
        if (authResult.error) return res.status(403).json(authResult.error);

        const model = req.body;
        const result = await updateExamService(model);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};
