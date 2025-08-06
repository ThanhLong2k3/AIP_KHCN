"use strict";
// src/controllers/subject.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubject = void 0;
const subject_service_1 = require("../../helpers/services/subject.service");
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const createSubject = async (req, res) => {
    try {
        // Kiểm tra quyền: phải có quyền SUBJECT_MANAGE
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'SUBJECT_MANAGE');
        if (authResult.error) {
            return res.status(401).json(authResult.error);
        }
        const model = req.body;
        const result = await (0, subject_service_1.createSubjectService)(model);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/subject/create:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
exports.createSubject = createSubject;
