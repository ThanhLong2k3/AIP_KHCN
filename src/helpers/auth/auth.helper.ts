import jwt from 'jsonwebtoken';
import { checkPermission } from '../repositories/permission.repository';
import { Request } from 'express';

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthPayload {
    username: string;
    role_id: string;
    email: string;
    image: string;
    name: string;
}

/**
 * Xác thực token từ request và kiểm tra quyền truy cập.
 * @param request - Express request
 * @param requiredPermissionCode - Mã quyền
 * @returns { error | user }
 */
export async function verifyAuth(request: Request, requiredPermissionCode?: string) {
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
        const user = jwt.verify(token, JWT_SECRET) as AuthPayload;

        if (requiredPermissionCode) {
            const hasPermission = await checkPermission(user.role_id, requiredPermissionCode);
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

    } catch (error) {
        return {
            error: {
                status: 401,
                message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.'
            }
        };
    }
}
