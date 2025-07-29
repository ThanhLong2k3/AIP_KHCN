"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchChapter = void 0;
const chapter_service_1 = require("../../helpers/services/chapter.service");
const searchChapter = async (req, res) => {
    try {
        const model = req.body; // chứa các tiêu chí tìm kiếm như keyword, phân trang, subject_id,...
        const data = await (0, chapter_service_1.searchChapterService)(model);
        return res.status(200).json({
            success: true,
            data
        });
    }
    catch (error) {
        console.error('API Error in POST /api/chapter/search:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
exports.searchChapter = searchChapter;
