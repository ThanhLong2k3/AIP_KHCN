"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExam = void 0;
const exam_service_1 = require("../../helpers/services/exam.service");
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const deleteExam = async (req, res) => {
    try {
        // Xác thực token với quyền EXAM_MANAGE
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'EXAM_MANAGE');
        if (authResult.error)
            return res.status(401).json(authResult.error);
        const { id, deleted_by } = req.body;
        const result = await (0, exam_service_1.deleteExamService)(id, deleted_by);
        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
exports.deleteExam = deleteExam;
