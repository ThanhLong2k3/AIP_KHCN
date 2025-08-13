"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChapter = void 0;
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const chapter_service_1 = require("../../helpers/services/chapter.service");
const createChapter = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'CHAPTER_MANAGE');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Không có quyền tạo chương.',
            });
        }
        const model = req.body;
        const result = await (0, chapter_service_1.createChapterService)(model);
        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        console.error("API Error in POST /api/chapter/create:", error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ'
        });
    }
};
exports.createChapter = createChapter;
