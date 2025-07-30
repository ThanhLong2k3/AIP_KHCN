"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLessonService = exports.searchLessonService = exports.updateLessonService = exports.createLessonService = void 0;
const lesson_repository_1 = require("../repositories/lesson.repository");
const createLessonService = async (model) => {
    try {
        // Validate input
        if (!model.id?.trim())
            throw new Error('id bài học không được để trống');
        if (!model.name?.trim())
            throw new Error('Tên bài học không được để trống');
        // Save
        const result = await (0, lesson_repository_1.createLesson)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi tạo bài học');
    }
};
exports.createLessonService = createLessonService;
const updateLessonService = async (model) => {
    try {
        if (!model.id?.trim())
            throw new Error('id bài học không được để trống');
        if (!model.name?.trim())
            throw new Error('Tên bài học không được để trống');
        const result = await (0, lesson_repository_1.updateLesson)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi cập nhật bài học');
    }
};
exports.updateLessonService = updateLessonService;
const searchLessonService = async (model) => {
    try {
        return await (0, lesson_repository_1.searchLessons)(model);
    }
    catch (error) {
        throw new Error('Không thể tìm kiếm bài học');
    }
};
exports.searchLessonService = searchLessonService;
const deleteLessonService = async (id, deletedBy) => {
    try {
        return await (0, lesson_repository_1.deleteLesson)(id, deletedBy);
    }
    catch (error) {
        throw new Error('Không thể xóa bài học' + error);
    }
};
exports.deleteLessonService = deleteLessonService;
