"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const account_service_1 = require("../../helpers/services/account.service");
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await (0, account_service_1.forgotPasswordService)(email);
        // Trả về kết quả xử lý từ service
        return res.status(200).json(result);
    }
    catch (err) {
        console.error('Lỗi API quên mật khẩu:', err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Gửi email thất bại do lỗi hệ thống.',
        });
    }
};
exports.forgotPassword = forgotPassword;
