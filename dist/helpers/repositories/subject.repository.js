"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSubjects = exports.deleteSubject = exports.updateSubject = exports.createSubject = void 0;
const api_Provider_1 = require("../../config/api_Provider");
// Thêm môn học mới
const createSubject = async (model) => {
    try {
        const sql = 'CALL add_subject(?,?,?,?,?,?,?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.name,
            model.image ?? null,
            model.description ?? null,
            model.textbook ?? null,
            model.workbook ?? null,
            model.exercise_book ?? null,
            model.flip_textbook ?? null,
            model.flip_workbook ?? null,
            model.flip_exercise_book ?? null,
            model.created_by,
            model.sort_order
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createSubject = createSubject;
// Cập nhật môn học
const updateSubject = async (model) => {
    try {
        const sql = 'CALL update_subject(?,?,?,?,?,?,?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.name,
            model.image ?? null,
            model.description ?? null,
            model.textbook ?? null,
            model.workbook ?? null,
            model.exercise_book ?? null,
            model.flip_textbook ?? null,
            model.flip_workbook ?? null,
            model.flip_exercise_book ?? null,
            model.updated_by,
            model.sort_order
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateSubject = updateSubject;
// Xóa môn học (xoá mềm)
const deleteSubject = async (id, deletedBy) => {
    try {
        const sql = 'CALL delete_subject(?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [id, deletedBy], true);
    }
    catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
exports.deleteSubject = deleteSubject;
// Tìm kiếm môn học có phân trang
const searchSubjects = async (model) => {
    try {
        const sql = 'CALL get_subjects(?,?,?,?)';
        const searchSubjectName = model.search_content_1 || null;
        const results = await (0, api_Provider_1.db_Provider)(sql, [
            model.page_index ?? 1,
            model.page_size ?? 10,
            model.order_type ?? 'ASC',
            searchSubjectName
        ]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.searchSubjects = searchSubjects;
