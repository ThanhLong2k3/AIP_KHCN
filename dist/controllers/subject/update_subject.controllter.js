"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubject = void 0;
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const subject_service_1 = require("../../helpers/services/subject.service");
const updateSubject = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'SUBJECT_MANAGE');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Không có quyền cập nhật bộ môn.',
            });
        }
        const model = req.body;
        const result = await (0, subject_service_1.updateSubjectService)(model);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error("API Error in POST /api/subject/update:", error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ',
        });
    }
};
exports.updateSubject = updateSubject;
