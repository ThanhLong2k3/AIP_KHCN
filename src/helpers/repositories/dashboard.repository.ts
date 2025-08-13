import { db_Provider } from "@/config/api_Provider";
import { IBlogView, IDashboardStats } from "@/models/dashboard";

export const getStats = async (): Promise<IDashboardStats> => {
    try {
        const sql = 'CALL get_dashboard_stats()';
        const result = await db_Provider(sql);
        // Thủ tục trả về một mảng chứa một object duy nhất
        return result[0];
    } catch (error) {
        console.error("Repository Error - getStats:", error);
        throw error;
    }
};


export const getBlogViewsInRange = async (startDate: string, endDate: string): Promise<IBlogView[]> => {
    try {
        const sql = 'CALL get_blog_views_by_date_range(?, ?)';
        return await db_Provider(sql, [startDate, endDate]);
    } catch (error) {
        console.error("Repository Error - getBlogViewsInRange:", error);
        throw error;
    }
};