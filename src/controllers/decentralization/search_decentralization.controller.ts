import { Request, Response } from 'express';
import { searchDecentralizationService } from '../../helpers/services/decentralization.service';
import { verifyAuth } from '../../helpers/auth/auth.helper';

export const searchDecentralization = async (req: Request, res: Response) => {
    try {
        // Xác thực quyền với mã quyền là 'ROLE_MANAGE'
        const authResult = await verifyAuth(req, 'ROLE_MANAGE');
        if (authResult.error) return res.status(401).json(authResult.error);

        const data = await searchDecentralizationService();

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error: any) {
        console.error('API Error in POST /api/decentralization/search:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
