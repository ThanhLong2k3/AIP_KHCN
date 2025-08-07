import { Request, Response } from 'express';
import { registerOTPService } from '../../helpers/services/account.service';
import env from '@/env';

export const sendRegisterOTP = async (req: Request, res: Response) => {
    try {
        const DEFAULT_STUDENT_ROLE_ID = env.ID_ROLE_STUDENT; // ID quyền học sinh
        console.log(DEFAULT_STUDENT_ROLE_ID, 'checkkkkk');

        const { email, username } = req.body;

        const result = await registerOTPService(email, username);

        // Trả về kết quả từ service
        return res.status(200).json(result);
    } catch (err: any) {
        console.error('Lỗi API OTP đăng ký tài khoản:', err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Gửi email thất bại do lỗi hệ thống.',
        });
    }
};
