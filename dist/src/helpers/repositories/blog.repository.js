"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogAuthors = exports.searchBlogs = exports.deleteBlog = exports.updateBlog = exports.createBlog = void 0;
const api_Provider_1 = require("../../config/api_Provider");
// Thêm bài viết mới
const createBlog = async (model) => {
    try {
        const sql = 'CALL add_blog(?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.image ?? null,
            model.title,
            model.description ?? null,
            model.created_by
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createBlog = createBlog;
// Cập nhật bài viết
const updateBlog = async (model) => {
    try {
        const sql = 'CALL update_blog(?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.image ?? null,
            model.title,
            model.description ?? null,
            model.updated_by
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateBlog = updateBlog;
// Xóa bài viết (xoá mềm)
const deleteBlog = async (id, deletedBy) => {
    try {
        const sql = 'CALL delete_blog(?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [id, deletedBy], true);
    }
    catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
exports.deleteBlog = deleteBlog;
// Tìm kiếm bài viết có phân trang
const searchBlogs = async (model) => {
    try {
        const sql = 'CALL get_blogs(?,?,?,?,?)';
        const searchTitle = model.search_content_1 || null;
        const searchAccountNameCreate = model.search_content_2 || null;
        const results = await (0, api_Provider_1.db_Provider)(sql, [
            model.page_index ?? 1,
            model.page_size ?? 10,
            model.order_type ?? 'ASC',
            searchTitle,
            searchAccountNameCreate
        ]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.searchBlogs = searchBlogs;
const getBlogAuthors = async () => {
    try {
        const sql = 'CALL get_blog_authors()';
        const results = await (0, api_Provider_1.db_Provider)(sql);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getBlogAuthors = getBlogAuthors;
