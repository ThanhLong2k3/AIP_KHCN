"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAdvisoryMember = void 0;
const advisory_member_service_1 = require("../../helpers/services/advisory_member.service");
// Tìm kiếm thành viên ban tư vấn
const searchAdvisoryMember = async (req, res) => {
    try {
        const model = req.body;
        const data = await (0, advisory_member_service_1.searchAdvisoryMemberService)(model);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/advisory_member/search:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
exports.searchAdvisoryMember = searchAdvisoryMember;
