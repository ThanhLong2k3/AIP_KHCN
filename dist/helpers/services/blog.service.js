"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogAuthorsService = exports.deleteBlogService = exports.searchBlogService = exports.updateBlogService = exports.createBlogService = void 0;
const blog_repository_1 = require("../repositories/blog.repository");
const createBlogService = async (model) => {
    try {
        // Validate input
        if (!model.id?.trim())
            throw new Error('id bài viết không được để trống');
        if (!model.title?.trim())
            throw new Error('Tiêu đề bài viết không được để trống');
        // Save
        const result = await (0, blog_repository_1.createBlog)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi tạo bài viết');
    }
};
exports.createBlogService = createBlogService;
const updateBlogService = async (model) => {
    try {
        if (!model.id?.trim())
            throw new Error('id bài viết không được để trống');
        if (!model.title?.trim())
            throw new Error('Tiêu đề bài viết không được để trống');
        const result = await (0, blog_repository_1.updateBlog)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi cập nhật bài viết');
    }
};
exports.updateBlogService = updateBlogService;
const searchBlogService = async (model) => {
    try {
        return await (0, blog_repository_1.searchBlogs)(model);
    }
    catch (error) {
        throw new Error('Không thể tìm kiếm bài viết');
    }
};
exports.searchBlogService = searchBlogService;
const deleteBlogService = async (id, deletedBy) => {
    try {
        return await (0, blog_repository_1.deleteBlog)(id, deletedBy);
    }
    catch (error) {
        throw new Error('Không thể xóa bài viết' + error);
    }
};
exports.deleteBlogService = deleteBlogService;
const getBlogAuthorsService = async () => {
    try {
        return await (0, blog_repository_1.getBlogAuthors)();
    }
    catch (error) {
        throw new Error('Không thể lấy danh sách tác giả.');
    }
};
exports.getBlogAuthorsService = getBlogAuthorsService;
