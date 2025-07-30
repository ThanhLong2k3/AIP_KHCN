"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamCreatedByName = exports.searchExams = exports.deleteExam = exports.updateExam = exports.createExam = void 0;
const api_Provider_1 = require("../../config/api_Provider");
// Thêm bài kiểm tra mới
const createExam = async (model) => {
    try {
        const sql = 'CALL add_exam(?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.name,
            model.subject_id,
            model.file,
            model.description ?? null,
            model.created_by
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createExam = createExam;
// Cập nhật bài kiểm tra
const updateExam = async (model) => {
    try {
        const sql = 'CALL update_exam(?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.name,
            model.subject_id,
            model.file,
            model.description ?? null,
            model.updated_by
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateExam = updateExam;
// Xóa bài kiểm tra (xoá mềm)
const deleteExam = async (id, deletedBy) => {
    try {
        const sql = 'CALL delete_exam(?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [id, deletedBy], true);
    }
    catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
exports.deleteExam = deleteExam;
// Tìm kiếm bài kiểm tra có phân trang
const searchExams = async (model) => {
    try {
        const sql = 'CALL get_exams(?,?,?,?,?,?)';
        const searchExamName = model.search_content_1 || null;
        const searchSubjectName = model.search_content_2 || null;
        const searchCreatedByName = model.search_content_3 || null;
        const results = await (0, api_Provider_1.db_Provider)(sql, [
            model.page_index ?? 1,
            model.page_size ?? 10,
            model.order_type ?? 'ASC',
            searchExamName,
            searchSubjectName,
            searchCreatedByName
        ]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.searchExams = searchExams;
const getExamCreatedByName = async () => {
    try {
        const sql = 'CALL get_exam_created_by_name()';
        const results = await (0, api_Provider_1.db_Provider)(sql);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getExamCreatedByName = getExamCreatedByName;
