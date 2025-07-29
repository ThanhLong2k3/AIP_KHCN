import { Request, Response } from 'express';
import { deleteExamService } from '../../helpers/services/exam.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const deleteExam = async (req: Request, res: Response) => {
    try {
        // Xác thực token với quyền EXAM_MANAGE
        const authResult = await verifyAuth(req, 'EXAM_MANAGE');
        if (authResult.error) return res.status(401).json(authResult.error);

        const { id, deleted_by } = req.body;
        const result = await deleteExamService(id, deleted_by);

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
