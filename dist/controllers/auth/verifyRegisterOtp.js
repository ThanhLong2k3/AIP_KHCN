"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRegisterOtp = void 0;
const account_service_1 = require("../../helpers/services/account.service");
// Xác thực OTP khi đăng ký tài khoản
const verifyRegisterOtp = async (req, res) => {
    try {
        const { otp, otpToken } = req.body;
        const result = await (0, account_service_1.verifyOtpService)(otp, otpToken);
        return res.status(200).json(result);
    }
    catch (err) {
        console.error('Lỗi API xác thực OTP:', err);
        return res.status(400).json({
            success: false,
            message: err.message || 'Xác thực OTP thất bại.',
        });
    }
};
exports.verifyRegisterOtp = verifyRegisterOtp;
