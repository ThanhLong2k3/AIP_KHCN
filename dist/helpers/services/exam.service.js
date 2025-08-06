"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamCreatedByNameService = exports.deleteExamService = exports.searchExamService = exports.updateExamService = exports.createExamService = void 0;
const exam_repository_1 = require("../repositories/exam.repository");
const createExamService = async (model) => {
    try {
        // Validate input
        if (!model.id?.trim())
            throw new Error('id bài kiểm tra không được để trống');
        if (!model.name?.trim())
            throw new Error('Tên bài kiểm tra không được để trống');
        // Save
        const result = await (0, exam_repository_1.createExam)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi tạo bài kiểm tra');
    }
};
exports.createExamService = createExamService;
const updateExamService = async (model) => {
    try {
        if (!model.id?.trim())
            throw new Error('id bài kiểm tra không được để trống');
        if (!model.name?.trim())
            throw new Error('Tên bài kiểm tra không được để trống');
        const result = await (0, exam_repository_1.updateExam)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi cập nhật bài kiểm tra');
    }
};
exports.updateExamService = updateExamService;
const searchExamService = async (model) => {
    try {
        return await (0, exam_repository_1.searchExams)(model);
    }
    catch (error) {
        throw new Error('Không thể tìm kiếm bài kiểm tra');
    }
};
exports.searchExamService = searchExamService;
const deleteExamService = async (id, deletedBy) => {
    try {
        return await (0, exam_repository_1.deleteExam)(id, deletedBy);
    }
    catch (error) {
        throw new Error('Không thể xóa bài kiểm tra' + error);
    }
};
exports.deleteExamService = deleteExamService;
const getExamCreatedByNameService = async () => {
    try {
        return await (0, exam_repository_1.getExamCreatedByName)();
    }
    catch (error) {
        throw new Error('Không thể lấy danh sách người tạo đề kiểm tra.');
    }
};
exports.getExamCreatedByNameService = getExamCreatedByNameService;
