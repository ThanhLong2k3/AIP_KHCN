"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBlogView = void 0;
const blog_service_1 = require("../../helpers/services/blog.service");
const addBlogView = async (req, res) => {
    try {
        const { blog_id } = req.body;
        if (!blog_id) {
            return res.status(400).json({
                success: false,
                message: "Thiếu ID của bài viết."
            });
        }
        (0, blog_service_1.addBlogViewService)(blog_id);
        return res.status(202).json({
            success: true,
            message: "Yêu cầu ghi nhận lượt xem đã được chấp nhận."
        });
    }
    catch (error) {
        console.error('Controller Error - addBlogView:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ khi xử lý yêu cầu.'
        });
    }
};
exports.addBlogView = addBlogView;
