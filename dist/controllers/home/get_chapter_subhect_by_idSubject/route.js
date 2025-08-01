"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChapterSubjectByIdHandler = getChapterSubjectByIdHandler;
const home_service_1 = require("../../../helpers/services/home.service");
async function getChapterSubjectByIdHandler(req, res) {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu ID trong query.',
            });
        }
        const data = await (0, home_service_1.GetChapterSubhectByIdSubject)(id);
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
