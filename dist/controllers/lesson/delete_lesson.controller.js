"use strict";
// src/controllers/lesson.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLesson = void 0;
const lesson_service_1 = require("../../helpers/services/lesson.service");
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const deleteLesson = async (req, res) => {
    try {
        // Xác thực token với quyền LESSON_MANAGE
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'LESSON_MANAGE');
        if (authResult.error)
            return res.status(401).json(authResult.error);
        const { id, deleted_by } = req.body;
        const result = await (0, lesson_service_1.deleteLessonService)(id, deleted_by);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/lesson/delete:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
exports.deleteLesson = deleteLesson;
