"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const account_service_1 = require("../../helpers/services/account.service");
const JWT_SECRET = process.env.JWT_SECRET;
const updateProfile = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req);
        if (authResult.error) {
            return res.status(authResult.error.status || 401).json({
                success: false,
                message: authResult.error.message || 'Xác thực không thành công.',
            });
        }
        const { username } = authResult.user;
        const { model } = req.body;
        //Gọi service để cập nhật và lấy về thông tin user mới nhất
        const updatedUser = await (0, account_service_1.updateProfileService)(username, model);
        //  TẠO TOKEN MỚI 
        // Tạo payload cho token mới với các thông tin đã được cập nhật
        const newTokenPayload = {
            username: updatedUser.user.username,
            role_id: updatedUser.user.role_id,
            email: updatedUser.user.email,
            name: updatedUser.user.name,
            image: updatedUser.user.image,
            permissions: updatedUser.user.permissions,
        };
        const newToken = jsonwebtoken_1.default.sign(newTokenPayload, JWT_SECRET, { expiresIn: '8h' });
        // 5. Trả về response thành công, kèm theo TOKEN MỚI
        return res.status(200).json({
            success: true,
            message: 'Cập nhật thông tin thành công!',
            token: newToken, // <-- Gửi token mới về cho client
        });
    }
    catch (error) {
        console.error('Lỗi khi cập nhật hồ sơ:', error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateProfile = updateProfile;
