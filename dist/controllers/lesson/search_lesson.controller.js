"use strict";
// src/controllers/lesson.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchLesson = void 0;
const lesson_service_1 = require("../../helpers/services/lesson.service");
const searchLesson = async (req, res) => {
    try {
        const model = req.body;
        const data = await (0, lesson_service_1.searchLessonService)(model);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/lesson/search:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
exports.searchLesson = searchLesson;
