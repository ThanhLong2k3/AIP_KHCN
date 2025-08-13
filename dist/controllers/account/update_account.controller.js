"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccount = void 0;
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const account_service_1 = require("../../helpers/services/account.service");
// Cập nhật tài khoản
const updateAccount = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'ACCOUNT_MANAGE');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền cập nhật tài khoản.',
            });
        }
        const model = req.body;
        const result = await (0, account_service_1.updateAccountService)(model);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/account/update:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
exports.updateAccount = updateAccount;
