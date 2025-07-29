"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchExam = void 0;
const exam_service_1 = require("../../helpers/services/exam.service");
const searchExam = async (req, res) => {
    try {
        const model = req.body;
        const data = await (0, exam_service_1.searchExamService)(model);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
exports.searchExam = searchExam;
