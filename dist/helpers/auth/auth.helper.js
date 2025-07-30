"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = verifyAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const permission_repository_1 = require("../repositories/permission.repository");
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Xác thực token từ request và kiểm tra quyền truy cập.
 * @param request - Express request
 * @param requiredPermissionCode - Mã quyền
 * @returns { error | user }
 */
async function verifyAuth(request, requiredPermissionCode) {
    if (!JWT_SECRET) {
        console.error('Lỗi cấu hình: JWT_SECRET chưa được thiết lập.');
        return {
            error: {
                status: 500,
                message: 'Lỗi cấu hình máy chủ.'
            }
        };
    }
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
            error: {
                status: 401,
                message: 'Yêu cầu không được xác thực. Vui lòng đăng nhập.'
            }
        };
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (requiredPermissionCode) {
            const hasPermission = await (0, permission_repository_1.checkPermission)(user.role_id, requiredPermissionCode);
            if (!hasPermission) {
                return {
                    error: {
                        status: 403,
                        message: 'Bạn không có quyền thực hiện hành động này.'
                    }
                };
            }
        }
        return { user };
    }
    catch (error) {
        return {
            error: {
                status: 401,
                message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.'
            }
        };
    }
}
