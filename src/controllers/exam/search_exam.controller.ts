import { Request, Response } from 'express';
import { searchExamService } from '../../helpers/services/exam.service';

export const searchExam = async (req: Request, res: Response) => {
    try {
        const model = req.body;
        const data = await searchExamService(model);

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
