"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAccount = void 0;
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const account_service_1 = require("../../helpers/services/account.service");
// Tìm kiếm tài khoản
const searchAccount = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'ACCOUNT_MANAGE');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền tìm kiếm tài khoản.',
            });
        }
        const model = req.body;
        const data = await (0, account_service_1.searchAccountService)(model);
        return res.status(200).json({
            success: true,
            message: 'Tìm kiếm tài khoản thành công.',
            data,
        });
    }
    catch (error) {
        console.error('[API_SEARCH_ACCOUNT_ERROR]', error);
        return res.status(500).json({
            success: false,
            message: 'Đã có lỗi xảy ra trong quá trình tìm kiếm.',
        });
    }
};
exports.searchAccount = searchAccount;
