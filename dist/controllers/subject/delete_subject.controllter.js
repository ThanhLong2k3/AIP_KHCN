"use strict";
// src/controllers/subject.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubject = void 0;
const subject_service_1 = require("../../helpers/services/subject.service");
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const deleteSubject = async (req, res) => {
    try {
        // Xác thực và kiểm tra quyền
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'SUBJECT_MANAGE');
        if (authResult.error) {
            return res.status(401).json(authResult.error);
        }
        const { id, deleted_by } = req.body;
        const result = await (0, subject_service_1.deleteSubjectService)(id, deleted_by);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/subject/delete:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
exports.deleteSubject = deleteSubject;
