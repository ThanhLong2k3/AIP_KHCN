"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogAuthors = void 0;
const blog_service_1 = require("../../helpers/services/blog.service");
// Lấy danh sách tác giả viết blog
const getBlogAuthors = async (_req, res) => {
    try {
        const data = await (0, blog_service_1.getBlogAuthorsService)();
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error('API Error in GET /api/blog/authors:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
exports.getBlogAuthors = getBlogAuthors;
