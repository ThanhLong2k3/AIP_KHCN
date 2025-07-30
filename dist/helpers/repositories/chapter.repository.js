"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchChapters = exports.deleteChapter = exports.updateChapter = exports.createChapter = void 0;
const api_Provider_1 = require("../../config/api_Provider");
// Thêm chương mới
const createChapter = async (model) => {
    try {
        const sql = 'CALL add_chapter(?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.name,
            model.subject_id,
            model.description ?? null,
            model.created_by,
            model.sort_order
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createChapter = createChapter;
// Cập nhật chương
const updateChapter = async (model) => {
    try {
        const sql = 'CALL update_chapter(?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.name,
            model.subject_id,
            model.description ?? null,
            model.updated_by,
            model.sort_order
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateChapter = updateChapter;
// Xóa chương (xoá mềm)
const deleteChapter = async (id, deletedBy) => {
    try {
        const sql = 'CALL delete_chapter(?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [id, deletedBy], true);
    }
    catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
exports.deleteChapter = deleteChapter;
// Tìm kiếm chương có phân trang
const searchChapters = async (model) => {
    try {
        const sql = 'CALL get_chapters(?,?,?,?,?)';
        const searchChapterName = model.search_content_1 || null;
        const searchSubjectName = model.search_content_2 || null;
        const results = await (0, api_Provider_1.db_Provider)(sql, [
            model.page_index ?? 1,
            model.page_size ?? 10,
            model.order_type ?? 'ASC',
            searchChapterName,
            searchSubjectName
        ]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.searchChapters = searchChapters;
