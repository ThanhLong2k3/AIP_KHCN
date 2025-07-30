"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogAuthors = void 0;
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const blog_service_1 = require("../../helpers/services/blog.service");
// Lấy danh sách tác giả viết blog
const getBlogAuthors = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'BLOG_MANAGE');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền truy cập.',
            });
        }
        const authors = await (0, blog_service_1.getBlogAuthorsService)();
        return res.status(200).json({
            success: true,
            data: authors,
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
