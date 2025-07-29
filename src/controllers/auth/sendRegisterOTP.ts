import { Request, Response } from 'express';
import { registerOTPService } from '../../helpers/services/account.service';

export const sendRegisterOTP = async (req: Request, res: Response) => {
    try {
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
