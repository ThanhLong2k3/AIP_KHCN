import { Request, Response } from 'express';
import { verifyOtpService } from '../../helpers/services/account.service';

// Xác thực OTP khi đăng ký tài khoản
export const verifyRegisterOtp = async (req: Request, res: Response) => {
    try {
        const { otp, otpToken } = req.body;

        const result = await verifyOtpService(otp, otpToken);

        return res.status(200).json(result);
    } catch (err: any) {
        console.error('Lỗi API xác thực OTP:', err);
        return res.status(400).json({
            success: false,
            message: err.message || 'Xác thực OTP thất bại.',
        });
    }
};
