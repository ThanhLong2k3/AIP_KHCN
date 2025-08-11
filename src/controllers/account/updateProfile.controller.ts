// Import thêm jwt
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { verifyAuth } from '@/helpers/auth/auth.helper';
import { updateProfileService } from '@/helpers/services/account.service';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req);
        if (authResult.error) {
            return res.status(authResult.error.status || 401).json({
                success: false,
                message: authResult.error.message || 'Xác thực không thành công.',
            });
        }
        const { username } = authResult.user;
        const { model } = req.body;

        //Gọi service để cập nhật và lấy về thông tin user mới nhất
        const updatedUser = await updateProfileService(username, model);

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

        const newToken = jwt.sign(newTokenPayload, JWT_SECRET, { expiresIn: '8h' });

        // 5. Trả về response thành công, kèm theo TOKEN MỚI
        return res.status(200).json({
            success: true,
            message: 'Cập nhật thông tin thành công!',
            token: newToken, // <-- Gửi token mới về cho client
        });

    } catch (error: any) {
        console.error('Lỗi khi cập nhật hồ sơ:', error);
        return res.status(400).json({ // Dùng 400 Bad Request cho lỗi nghiệp vụ
            success: false,
            message: error.message
        });
    }
};