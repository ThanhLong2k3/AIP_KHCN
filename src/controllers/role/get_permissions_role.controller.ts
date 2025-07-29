// src/controllers/role.controller.ts

import { Request, Response } from 'express';
import { getRolePermissionsService } from '../../helpers/services/role.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const getRolePermissions = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'ROLE_MANAGE');
        if (authResult.error) {
            return res.status(401).json(authResult.error);
        }

        const { role_id } = req.body;
        if (!role_id) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu ID của vai trò.',
            });
        }

        const permissionIds = await getRolePermissionsService(role_id);

        return res.status(200).json({
            success: true,
            data: permissionIds,
        });
    } catch (error: any) {
        console.error('Lỗi getRolePermissions:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
