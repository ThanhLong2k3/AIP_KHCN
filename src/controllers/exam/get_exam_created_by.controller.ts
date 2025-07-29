import { Request, Response } from 'express';
import { getExamCreatedByNameService } from '../../helpers/services/exam.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const getExamCreatedByName = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'EXAM_MANAGE');
        if (authResult.error) return res.status(403).json(authResult.error);

        const authors = await getExamCreatedByNameService();

        return res.status(200).json({
            success: true,
            data: authors
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};
