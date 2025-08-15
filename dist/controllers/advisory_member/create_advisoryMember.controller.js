"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdvisoryMember = void 0;
const auth_helper_1 = require("../../helpers/auth/auth.helper");
const advisory_member_service_1 = require("../../helpers/services/advisory_member.service");
const createAdvisoryMember = async (req, res) => {
    try {
        // Xác thực token và quyền
        const authResult = await (0, auth_helper_1.verifyAuth)(req, 'ADVISORY_MANAGE');
        if (authResult.error) {
            return res.status(authResult.error.status || 403).json({
                success: false,
                message: authResult.error.message || 'Bạn không có quyền truy cập.',
            });
        }
        const model = req.body;
        const result = await (0, advisory_member_service_1.createAdvisoryMemberService)(model);
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/advisory_member/create:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Lỗi máy chủ nội bộ.',
        });
    }
};
exports.createAdvisoryMember = createAdvisoryMember;
