"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const account_service_1 = require("../../helpers/services/account.service");
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const result = await (0, account_service_1.resetPasswordService)(email, newPassword);
        return res.status(200).json(result);
    }
    catch (err) {
        console.error('Lỗi API đặt lại mật khẩu:', err);
        return res.status(400).json({
            success: false,
            message: err.message || 'Không thể đặt lại mật khẩu.',
        });
    }
};
exports.resetPassword = resetPassword;
