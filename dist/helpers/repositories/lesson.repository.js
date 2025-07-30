"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchLessons = exports.deleteLesson = exports.updateLesson = exports.createLesson = void 0;
const api_Provider_1 = require("../../config/api_Provider");
// Thêm bài học mới
const createLesson = async (model) => {
    try {
        const sql = 'CALL add_lesson(?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.name,
            model.image,
            model.chapter_id,
            model.description ?? null,
            model.created_by
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createLesson = createLesson;
// Cập nhật bài học
const updateLesson = async (model) => {
    try {
        const sql = 'CALL update_lesson(?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.name,
            model.image,
            model.chapter_id,
            model.description ?? null,
            model.updated_by
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateLesson = updateLesson;
// Xóa bài học (xoá mềm)
const deleteLesson = async (id, deletedBy) => {
    try {
        const sql = 'CALL delete_lesson(?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [id, deletedBy], true);
    }
    catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
exports.deleteLesson = deleteLesson;
// Tìm kiếm môn học có phân trang
const searchLessons = async (model) => {
    try {
        const sql = 'CALL get_lessons(?,?,?,?,?,?)';
        const searchLessonName = model.search_content_1 || null;
        const searchChapterName = model.search_content_2 || null;
        const searchSubjectName = model.search_content_3 || null;
        const results = await (0, api_Provider_1.db_Provider)(sql, [
            model.page_index ?? 1,
            model.page_size ?? 10,
            model.order_type ?? 'ASC',
            searchLessonName,
            searchChapterName,
            searchSubjectName
        ]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.searchLessons = searchLessons;
