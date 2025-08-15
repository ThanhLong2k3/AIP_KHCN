"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdvisoryMember = void 0;
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const advisory_member_service_1 = require("../../helpers/services/advisory_member.service");
// Cập nhật thông tin thành viên hội đồng
const updateAdvisoryMember = async (req, res) => {
    try {
        // Xác thực token và quyền ADVISORY_MANAGE
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'ADVISORY_MANAGE');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền cập nhật thành viên.',
            });
        }
        const model = req.body;
        const result = await (0, advisory_member_service_1.updateAdvisoryMemberService)(model);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/advisory_member/update:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
exports.updateAdvisoryMember = updateAdvisoryMember;
