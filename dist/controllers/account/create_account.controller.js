"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = void 0;
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const account_service_1 = require("../../helpers/services/account.service");
// Tạo tài khoản
const createAccount = async (req, res) => {
    try {
        // Kiểm tra quyền (ACCOUNT_MANAGE)
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'ACCOUNT_MANAGE');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền thực hiện chức năng này.',
            });
        }
        const model = req.body;
        const result = await (0, account_service_1.createAccountService)(model);
        return res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        console.error('API Error in POST /api/account/create:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
exports.createAccount = createAccount;
