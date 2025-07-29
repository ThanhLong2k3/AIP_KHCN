"use strict";
// src/controllers/subject.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSubject = void 0;
const subject_service_1 = require("../../helpers/services/subject.service");
const searchSubject = async (req, res) => {
    try {
        const model = req.body; // chứa: từ khóa, phân trang, người tạo, v.v.
        const data = await (0, subject_service_1.searchSubjectService)(model);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/subject/search:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
exports.searchSubject = searchSubject;
