"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchComment = void 0;
const comment_service_1 = require("../../helpers/services/comment.service");
const searchComment = async (req, res) => {
    try {
        const model = req.body; // lấy dữ liệu tìm kiếm từ body
        const data = await (0, comment_service_1.searchCommentService)(model);
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
exports.searchComment = searchComment;
