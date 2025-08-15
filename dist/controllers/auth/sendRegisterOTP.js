"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRegisterOTP = void 0;
const account_service_1 = require("../../helpers/services/account.service");
const env_1 = __importDefault(require("../../env"));
const sendRegisterOTP = async (req, res) => {
    try {
        const DEFAULT_STUDENT_ROLE_ID = env_1.default.ID_ROLE_STUDENT; // ID quyền học sinh
        console.log(DEFAULT_STUDENT_ROLE_ID, 'checkkkkk');
        const { email, username } = req.body;
        const result = await (0, account_service_1.registerOTPService)(email, username);
        // Trả về kết quả từ service
        return res.status(200).json(result);
    }
    catch (err) {
        console.error('Lỗi API OTP đăng ký tài khoản:', err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Gửi email thất bại do lỗi hệ thống.',
        });
    }
};
exports.sendRegisterOTP = sendRegisterOTP;
