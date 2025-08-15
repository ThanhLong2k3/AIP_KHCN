"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentService = exports.searchCommentService = exports.createCommentService = void 0;
const comment_repository_1 = require("../repositories/comment.repository");
const createCommentService = async (model) => {
    try {
        // Validate input
        if (!model.id?.trim())
            throw new Error('id bình luận không được để trống');
        if (!model.content?.trim())
            throw new Error('Nội dung bình luận không được để trống');
        // Save
        const result = await (0, comment_repository_1.createComment)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi tạo bình luận');
    }
};
exports.createCommentService = createCommentService;
const searchCommentService = async (model) => {
    try {
        return await (0, comment_repository_1.searchComments)(model);
    }
    catch (error) {
        throw new Error('Không thể tìm kiếm bình luận');
    }
};
exports.searchCommentService = searchCommentService;
const deleteCommentService = async (id) => {
    if (!id?.trim())
        throw new Error('id bình luận không được để trống');
    try {
        return await (0, comment_repository_1.deleteComment)(id);
    }
    catch (error) {
        throw new Error('Không thể xóa bình luận: ' + error);
    }
};
exports.deleteCommentService = deleteCommentService;
