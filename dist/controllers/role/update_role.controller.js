"use strict";
// src/controllers/role.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRole = void 0;
const role_service_1 = require("../../helpers/services/role.service");
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const updateRole = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'ROLE_MANAGE');
        if (authResult.error) {
            return res.status(401).json(authResult.error);
        }
        const model = req.body;
        const result = await (0, role_service_1.updateRoleService)(model);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateRole = updateRole;
