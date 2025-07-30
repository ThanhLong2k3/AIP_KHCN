"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAdvisoryMembers = exports.deleteAdvisoryMember = exports.updateAdvisoryMember = exports.createAdvisoryMember = void 0;
const api_Provider_1 = require("../../config/api_Provider");
// Thêm thành viên ban tư vấn mới
const createAdvisoryMember = async (model) => {
    try {
        const sql = 'CALL add_advisory_member(?,?,?,?,?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.teacher_name,
            model.image,
            model.qualification ?? null,
            model.subject,
            model.in_charge ?? null,
            model.workplace ?? null,
            model.years_of_experience ?? null,
            model.description ?? null,
            model.created_by,
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createAdvisoryMember = createAdvisoryMember;
// Cập nhật thành viên ban tư vấn
const updateAdvisoryMember = async (model) => {
    try {
        const sql = 'CALL update_advisory_member(?,?,?,?,?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.teacher_name,
            model.image,
            model.qualification ?? null,
            model.subject,
            model.in_charge ?? null,
            model.workplace ?? null,
            model.years_of_experience ?? null,
            model.description ?? null,
            model.updated_by,
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateAdvisoryMember = updateAdvisoryMember;
// Xóa thành viên ban tư vấn (xoá mềm)
const deleteAdvisoryMember = async (id, deletedBy) => {
    try {
        const sql = 'CALL delete_advisory_member(?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [id, deletedBy], true);
    }
    catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
exports.deleteAdvisoryMember = deleteAdvisoryMember;
// Tìm kiếm thành viên ban tư vấn có phân trang
const searchAdvisoryMembers = async (model) => {
    try {
        const sql = 'CALL get_advisory_members(?,?,?,?)';
        const searchContent = model.search_content_1 || null;
        const results = await (0, api_Provider_1.db_Provider)(sql, [
            model.page_index ?? 1,
            model.page_size ?? 10,
            model.order_type ?? 'ASC',
            searchContent,
        ]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.searchAdvisoryMembers = searchAdvisoryMembers;
