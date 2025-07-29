"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlog = void 0;
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const blog_service_1 = require("../../helpers/services/blog.service");
const createBlog = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'BLOG_MANAGE');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Không có quyền tạo blog.',
            });
        }
        const model = req.body;
        const result = await (0, blog_service_1.createBlogService)(model);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/blog/create:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
exports.createBlog = createBlog;
