"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAccount = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_service_1 = require("../../helpers/services/account.service");
const JWT_SECRET = process.env.JWT_SECRET || 'dinhthientruong21dinhthientruong09dinhthientruong2004!@#$%^&*()-_=+[{]}\|;:,<.>/?';
// Đăng nhập tài khoản
const loginAccount = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập đầy đủ thông tin.',
            });
        }
        // Gọi service đăng nhập
        const loginResult = await (0, account_service_1.login)(username, password);
        if (!loginResult.success) {
            return res.status(401).json({
                success: false,
                message: loginResult.message,
            });
        }
        const user = loginResult.user;
        // Tạo token JWT
        const token = jsonwebtoken_1.default.sign({
            username: user.username,
            role_id: user.role_id,
            email: user.email,
            name: user.name,
            image: user.image,
            permissions: user.permissions,
        }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            token,
            user,
        });
    }
    catch (err) {
        console.error('Lỗi hệ thống trong API Login:', err);
        return res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ.',
        });
    }
};
exports.loginAccount = loginAccount;
