// src/controllers/role.controller.ts

import { Request, Response } from 'express';
import { updatePermissionsForRoleService } from '../../helpers/services/role.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const updateRolePermissions = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'ROLE_MANAGE');
        if (authResult.error) {
            return res.status(401).json(authResult.error);
        }

        const { role_id, permission_ids } = req.body;

        const isSuccess = await updatePermissionsForRoleService(role_id, permission_ids);

        if (isSuccess) {
            return res.status(200).json({
                success: true,
                message: 'Cập nhật quyền thành công.',
            });
        } else {
            throw new Error('Cập nhật quyền thất bại tại CSDL.');
        }
    } catch (error: any) {
        console.error('Lỗi updateRolePermissions:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
