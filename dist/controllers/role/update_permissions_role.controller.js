"use strict";
// src/controllers/role.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRolePermissions = void 0;
const role_service_1 = require("../../helpers/services/role.service");
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const updateRolePermissions = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'ROLE_MANAGE');
        if (authResult.error) {
            return res.status(401).json(authResult.error);
        }
        const { role_id, permission_ids } = req.body;
        const isSuccess = await (0, role_service_1.updatePermissionsForRoleService)(role_id, permission_ids);
        if (isSuccess) {
            return res.status(200).json({
                success: true,
                message: 'Cập nhật quyền thành công.',
            });
        }
        else {
            throw new Error('Cập nhật quyền thất bại tại CSDL.');
        }
    }
    catch (error) {
        console.error('Lỗi updateRolePermissions:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
exports.updateRolePermissions = updateRolePermissions;
