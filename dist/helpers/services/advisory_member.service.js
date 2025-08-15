"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdvisoryMemberService = exports.searchAdvisoryMemberService = exports.updateAdvisoryMemberService = exports.createAdvisoryMemberService = void 0;
const advisory_member_repository_1 = require("../repositories/advisory_member.repository");
const createAdvisoryMemberService = async (model) => {
    try {
        // Validate input
        if (!model.id?.trim())
            throw new Error('id thành viên ban tư vấn không được để trống');
        if (!model.teacher_name?.trim())
            throw new Error('Tên giáo viên ban tư vấn không được để trống');
        // Save
        const result = await (0, advisory_member_repository_1.createAdvisoryMember)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi tạo thành viên ban tư vấn');
    }
};
exports.createAdvisoryMemberService = createAdvisoryMemberService;
const updateAdvisoryMemberService = async (model) => {
    try {
        if (!model.id?.trim())
            throw new Error('id thành viên ban tư vấn không được để trống');
        if (!model.teacher_name?.trim())
            throw new Error('Tên thành viên ban tư vấn không được để trống');
        const result = await (0, advisory_member_repository_1.updateAdvisoryMember)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi cập nhật thành viên ban tư vấn');
    }
};
exports.updateAdvisoryMemberService = updateAdvisoryMemberService;
const searchAdvisoryMemberService = async (model) => {
    try {
        return await (0, advisory_member_repository_1.searchAdvisoryMembers)(model);
    }
    catch (error) {
        throw new Error('Không thể tìm kiếm thành viên ban tư vấn');
    }
};
exports.searchAdvisoryMemberService = searchAdvisoryMemberService;
const deleteAdvisoryMemberService = async (id, deletedBy) => {
    try {
        return await (0, advisory_member_repository_1.deleteAdvisoryMember)(id, deletedBy);
    }
    catch (error) {
        throw new Error('Không thể xóa thành viên ban tư vấn' + error);
    }
};
exports.deleteAdvisoryMemberService = deleteAdvisoryMemberService;
