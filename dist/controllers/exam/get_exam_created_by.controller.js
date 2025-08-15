"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamCreatedByName = void 0;
const exam_service_1 = require("../../helpers/services/exam.service");
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const getExamCreatedByName = async (req, res) => {
    try {
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'EXAM_MANAGE');
        if (authResult.error)
            return res.status(403).json(authResult.error);
        const authors = await (0, exam_service_1.getExamCreatedByNameService)();
        return res.status(200).json({
            success: true,
            data: authors
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};
exports.getExamCreatedByName = getExamCreatedByName;
