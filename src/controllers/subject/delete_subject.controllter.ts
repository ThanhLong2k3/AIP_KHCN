// src/controllers/subject.controller.ts

import { Request, Response } from 'express';
import { deleteSubjectService } from '../../helpers/services/subject.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const deleteSubject = async (req: Request, res: Response) => {
    try {
        // Xác thực và kiểm tra quyền
        const authResult = await verifyAuth(req, 'SUBJECT_MANAGE');
        if (authResult.error) {
            return res.status(401).json(authResult.error);
        }

        const { id, deleted_by } = req.body;

        const result = await deleteSubjectService(id, deleted_by);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error('API Error in POST /api/subject/delete:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
