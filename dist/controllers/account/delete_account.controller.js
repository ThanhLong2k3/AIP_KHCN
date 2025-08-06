"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = void 0;
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const account_service_1 = require("../../helpers/services/account.service");
// Xoá tài khoản
const deleteAccount = async (req, res) => {
    try {
        // Xác thực quyền
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'ACCOUNT_MANAGE');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền xoá tài khoản.',
            });
        }
        const { username, deleted_by } = req.body;
        const result = await (0, account_service_1.deleteAccountService)(username, deleted_by);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/account/delete:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
exports.deleteAccount = deleteAccount;
