"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDecentralization = void 0;
const decentralization_service_1 = require("../../helpers/services/decentralization.service");
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const searchDecentralization = async (req, res) => {
    try {
        // Xác thực quyền với mã quyền là 'ROLE_MANAGE'
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'ROLE_MANAGE');
        if (authResult.error)
            return res.status(401).json(authResult.error);
        const data = await (0, decentralization_service_1.searchDecentralizationService)();
        return res.status(200).json({
            success: true,
            data
        });
    }
    catch (error) {
        console.error('API Error in POST /api/decentralization/search:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
exports.searchDecentralization = searchDecentralization;
