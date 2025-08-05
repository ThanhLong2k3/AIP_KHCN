"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = void 0;
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const account_service_1 = require("../../helpers/services/account.service");
const verifyPassword = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req); // KHÔNG truyền mã quyền, chỉ xác thực người dùng
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền thực hiện chức năng này.',
            });
        }
        const { username } = authResult.user; // Lấy username từ token
        const { currentPassword } = req.body;
        const result = await (0, account_service_1.verifyCurrentPasswordService)(username, currentPassword);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.verifyPassword = verifyPassword;
