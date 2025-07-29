import { Request, Response } from 'express';
import { verifyAuth } from '../../helpers/auth/auth.helper';
import { updateAdvisoryMemberService } from '../../helpers/services/advisory_member.service';

// Cập nhật thông tin thành viên hội đồng
export const updateAdvisoryMember = async (req: Request, res: Response) => {
    try {
        // Xác thực token và quyền ADVISORY_MANAGE
        const authResult = await verifyAuth(req, 'ADVISORY_MANAGE');

        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền cập nhật thành viên.',
            });
        }

        const model = req.body;
        const result = await updateAdvisoryMemberService(model);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error('API Error in POST /api/advisory_member/update:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
