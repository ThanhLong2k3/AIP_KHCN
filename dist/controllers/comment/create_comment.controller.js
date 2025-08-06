"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = void 0;
const comment_service_1 = require("../../helpers/services/comment.service");
const createComment = async (req, res) => {
    try {
        const model = req.body;
        const result = await (0, comment_service_1.createCommentService)(model);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/comment/create:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
exports.createComment = createComment;
