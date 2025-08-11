import { verifyAuth } from '@/helpers/auth/auth.helper';
import { getBlogViewsService, getDashboardStatsService } from '@/helpers/services/dashboard.service';
import { Request, Response } from 'express';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'DASHBOARD_VIEW');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Không có quyền truy cập.'
            });
        }

        const stats = await getDashboardStatsService();

        return res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error: any) {
        console.error('Controller Error - getDashboardStats:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ khi lấy dữ liệu thống kê.'
        });
    }
};

export const getBlogViews = async (req: Request, res: Response) => {
    try {
        const authResult = await verifyAuth(req, 'DASHBOARD_VIEW');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Không có quyền truy cập.'
            });
        }

        const { startDate, endDate } = req.query;

        if (!startDate || !endDate || typeof startDate !== 'string' || typeof endDate !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Ngày bắt đầu và kết thúc là bắt buộc."
            });
        }

        // --- LOGIC GIỚI HẠN THỜI GIAN TRUY VẤN ---
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Kiểm tra xem ngày có hợp lệ không
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Định dạng ngày không hợp lệ."
            });
        }

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Giới hạn tối đa là 1 năm (366 ngày).
        const MAX_DAYS_RANGE = 366;
        if (diffDays > MAX_DAYS_RANGE) {
            return res.status(400).json({
                success: false,
                message: `Khoảng thời gian truy vấn không được vượt quá ${MAX_DAYS_RANGE} ngày.`
            });
        }

        const viewsData = await getBlogViewsService(startDate, endDate);

        return res.status(200).json({
            success: true,
            data: viewsData
        });

    } catch (error: any) {
        console.error('Controller Error - getBlogViews:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ khi lấy dữ liệu biểu đồ.'
        });
    }
};