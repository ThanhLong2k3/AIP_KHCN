"use strict";
// src/controllers/role.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRolePermissions = void 0;
const role_service_1 = require("../../helpers/services/role.service");
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const getRolePermissions = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'ROLE_MANAGE');
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
        const permissionIds = await (0, role_service_1.getRolePermissionsService)(role_id);
        return res.status(200).json({
            success: true,
            data: permissionIds,
        });
    }
    catch (error) {
        console.error('Lỗi getRolePermissions:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
exports.getRolePermissions = getRolePermissions;
