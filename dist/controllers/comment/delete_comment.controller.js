"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = void 0;
const comment_service_1 = require("../../helpers/services/comment.service");
const deleteComment = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await (0, comment_service_1.deleteCommentService)(id);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
exports.deleteComment = deleteComment;
