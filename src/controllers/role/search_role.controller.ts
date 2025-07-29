// src/controllers/role.controller.ts

import { Request, Response } from 'express';
import { searchRoleService } from '../../helpers/services/role.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const searchRole = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'ROLE_MANAGE');
        if (authResult.error) {
            return res.status(401).json(authResult.error);
        }

        const model = req.body;
        const data = await searchRoleService(model);

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
