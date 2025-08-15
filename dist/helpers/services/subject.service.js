"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubjectService = exports.searchSubjectService = exports.updateSubjectService = exports.createSubjectService = void 0;
const subject_repository_1 = require("../repositories/subject.repository");
const createSubjectService = async (model) => {
    try {
        // Validate input
        if (!model.id?.trim())
            throw new Error('id môn học không được để trống');
        if (!model.name?.trim())
            throw new Error('Tên môn học không được để trống');
        // Save
        const result = await (0, subject_repository_1.createSubject)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi tạo môn học');
    }
};
exports.createSubjectService = createSubjectService;
const updateSubjectService = async (model) => {
    try {
        if (!model.id?.trim())
            throw new Error('id môn học không được để trống');
        if (!model.name?.trim())
            throw new Error('Tên môn học không được để trống');
        const result = await (0, subject_repository_1.updateSubject)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi cập nhật môn học');
    }
};
exports.updateSubjectService = updateSubjectService;
const searchSubjectService = async (model) => {
    try {
        return await (0, subject_repository_1.searchSubjects)(model);
    }
    catch (error) {
        throw new Error('Không thể tìm kiếm môn học');
    }
};
exports.searchSubjectService = searchSubjectService;
const deleteSubjectService = async (id, deletedBy) => {
    try {
        return await (0, subject_repository_1.deleteSubject)(id, deletedBy);
    }
    catch (error) {
        throw new Error('Không thể xóa môn học' + error);
    }
};
exports.deleteSubjectService = deleteSubjectService;
