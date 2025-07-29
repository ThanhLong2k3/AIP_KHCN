"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChapterService = exports.searchChapterService = exports.updateChapterService = exports.createChapterService = void 0;
const chapter_repository_1 = require("../repositories/chapter.repository");
const createChapterService = async (model) => {
    try {
        // Validate input
        if (!model.id?.trim())
            throw new Error('id chương không được để trống');
        if (!model.name?.trim())
            throw new Error('Tên chương không được để trống');
        // Save
        const result = await (0, chapter_repository_1.createChapter)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi tạo chương');
    }
};
exports.createChapterService = createChapterService;
const updateChapterService = async (model) => {
    try {
        if (!model.id?.trim())
            throw new Error('id chương không được để trống');
        if (!model.name?.trim())
            throw new Error('Tên chương không được để trống');
        const result = await (0, chapter_repository_1.updateChapter)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi cập nhật chương');
    }
};
exports.updateChapterService = updateChapterService;
const searchChapterService = async (model) => {
    try {
        return await (0, chapter_repository_1.searchChapters)(model);
    }
    catch (error) {
        throw new Error('Không thể tìm kiếm chương');
    }
};
exports.searchChapterService = searchChapterService;
const deleteChapterService = async (id, deletedBy) => {
    try {
        return await (0, chapter_repository_1.deleteChapter)(id, deletedBy);
    }
    catch (error) {
        throw new Error('Không thể xóa chương' + error);
    }
};
exports.deleteChapterService = deleteChapterService;
