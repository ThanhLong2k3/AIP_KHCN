import { Request, Response } from 'express';
import { searchAdvisoryMemberService } from '../../helpers/services/advisory_member.service';

// Tìm kiếm thành viên ban tư vấn
export const searchAdvisoryMember = async (req: Request, res: Response) => {
    try {
        const model = req.body;
        const data = await searchAdvisoryMemberService(model);

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error: any) {
        console.error('API Error in POST /api/advisory_member/search:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
