"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExam = void 0;
const exam_service_1 = require("../../helpers/services/exam.service");
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const updateExam = async (req, res) => {
    try {
        // Kiểm tra xác thực + phân quyền
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'EXAM_MANAGE');
        if (authResult.error)
            return res.status(403).json(authResult.error);
        const model = req.body;
        const result = await (0, exam_service_1.updateExamService)(model);
        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};
exports.updateExam = updateExam;
