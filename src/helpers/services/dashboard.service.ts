import * as dashboardRepo from '../repositories/dashboard.repository';

export const getDashboardStatsService = async () => {
    try {
        return await dashboardRepo.getStats();
    } catch (error: any) {
        throw new Error(error.message || "Lỗi khi lấy dữ liệu thống kê.");
    }
};

export const getBlogViewsService = async (startDate: string, endDate: string) => {
    try {
        return await dashboardRepo.getBlogViewsInRange(startDate, endDate);
    } catch (error: any) {
        throw new Error(error.message || "Lỗi khi lấy dữ liệu biểu đồ.");
    }
};