// src/controllers/role.controller.ts

import { Request, Response } from 'express';
import { updateRoleService } from '../../helpers/services/role.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const updateRole = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'ROLE_MANAGE');
        if (authResult.error) {
            return res.status(401).json(authResult.error);
        }

        const model = req.body;
        const result = await updateRoleService(model);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
