"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectsWithLessonsHandler = getSubjectsWithLessonsHandler;
const home_service_1 = require("../../../helpers/services/home.service");
async function getSubjectsWithLessonsHandler(_, res) {
    try {
        const data = await (0, home_service_1.GetSubjectsWithLessonsService)();
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Đã xảy ra lỗi.',
        });
    }
}
