"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBlog = void 0;
const blog_service_1 = require("../../helpers/services/blog.service");
const searchBlog = async (req, res) => {
    try {
        const model = req.body; // lấy dữ liệu tìm kiếm từ body
        const data = await (0, blog_service_1.searchBlogService)(model);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.searchBlog = searchBlog;
