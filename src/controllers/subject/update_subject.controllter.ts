import { Request, Response } from 'express';
import { verifyAuth } from '../../helpers/auth/auth.helper';
import { updateSubjectService } from '../../helpers/services/subject.service';

export const updateSubject = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'SUBJECT_MANAGE');

        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Không có quyền cập nhật bộ môn.',
            });
        }

        const model = req.body;
        const result = await updateSubjectService(model);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error("API Error in POST /api/subject/update:", error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
