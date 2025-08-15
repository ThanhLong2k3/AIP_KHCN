"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogViewsInRange = exports.getStats = void 0;
const api_Provider_1 = require("../../config/api_Provider");
const getStats = async () => {
    try {
        const sql = 'CALL get_dashboard_stats()';
        const result = await (0, api_Provider_1.db_Provider)(sql);
        // Thủ tục trả về một mảng chứa một object duy nhất
        return result[0];
    }
    catch (error) {
        console.error("Repository Error - getStats:", error);
        throw error;
    }
};
exports.getStats = getStats;
const getBlogViewsInRange = async (startDate, endDate) => {
    try {
        const sql = 'CALL get_blog_views_by_date_range(?, ?)';
        return await (0, api_Provider_1.db_Provider)(sql, [startDate, endDate]);
    }
    catch (error) {
        console.error("Repository Error - getBlogViewsInRange:", error);
        throw error;
    }
};
exports.getBlogViewsInRange = getBlogViewsInRange;
