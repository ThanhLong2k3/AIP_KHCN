import { Request, Response } from 'express';
import { forgotPasswordService } from '../../helpers/services/account.service';

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const result = await forgotPasswordService(email);

        // Trả về kết quả xử lý từ service
        return res.status(200).json(result);
    } catch (err: any) {
        console.error('Lỗi API quên mật khẩu:', err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Gửi email thất bại do lỗi hệ thống.',
        });
    }
};
