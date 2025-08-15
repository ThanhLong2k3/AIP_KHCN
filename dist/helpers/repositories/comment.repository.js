"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchComments = exports.deleteComment = exports.createComment = void 0;
const api_Provider_1 = require("../../config/api_Provider");
// Thêm bình luận mới
const createComment = async (model) => {
    try {
        const sql = 'CALL add_comment(?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.content,
            model.blog_id,
            model.created_by
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createComment = createComment;
// Xóa bình luận (xoá mềm)
const deleteComment = async (id) => {
    try {
        const sql = 'CALL delete_comment(?)';
        return await (0, api_Provider_1.db_Provider)(sql, [id], true);
    }
    catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
exports.deleteComment = deleteComment;
// Tìm kiếm bài viết có phân trang
const searchComments = async (model) => {
    try {
        const sql = 'CALL get_comments(?,?,?,?,?)';
        const searchBlogID = model.search_content_1 || null;
        const searchAccountNameCreate = model.search_content_2 || null;
        const results = await (0, api_Provider_1.db_Provider)(sql, [
            model.page_index ?? 1,
            model.page_size ?? 10,
            model.order_type ?? 'ASC',
            searchBlogID,
            searchAccountNameCreate
        ]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.searchComments = searchComments;
