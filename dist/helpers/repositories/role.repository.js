"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRoles = exports.deleteRole = exports.countAccountsByRoleId = exports.updateRole = exports.createRole = void 0;
const api_Provider_1 = require("../../config/api_Provider");
// Thêm nhóm quyền mới
const createRole = async (model) => {
    try {
        const sql = 'CALL add_role(?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.name,
            model.description ?? null
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createRole = createRole;
// Cập nhật nhóm quyền
const updateRole = async (model) => {
    try {
        const sql = 'CALL update_role(?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.id,
            model.name,
            model.description ?? null,
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateRole = updateRole;
/**
 * Đếm số lượng tài khoản đang hoạt động theo một role_id cụ thể.
 * @param roleId - ID của vai trò cần kiểm tra.
 * @returns Số lượng tài khoản.
 */
const countAccountsByRoleId = async (roleId) => {
    try {
        const sql = 'SELECT COUNT(*) as count FROM accounts WHERE role_id = ? AND deleted = FALSE';
        // `response` là object { success: true, details: [ { count: 1 } ] }
        const response = await (0, api_Provider_1.db_Provider)(sql, [roleId], true);
        // 1. Kiểm tra xem response có thành công không
        // 2. Lấy mảng `details` từ response, không phải `response` trực tiếp
        const resultDetails = response.details;
        // 3. Kiểm tra mảng `details` này
        if (response.success && resultDetails && resultDetails.length > 0) {
            // 4. Lấy giá trị 'count' từ phần tử đầu tiên của mảng `details`
            const count = resultDetails[0].count;
            return count;
        }
        // Nếu không có details hoặc success là false, trả về 0
        return 0;
    }
    catch (error) {
        console.error("Lỗi khi đếm tài khoản theo vai trò:", error);
        throw new Error("Lỗi truy vấn cơ sở dữ liệu khi đếm tài khoản.");
    }
};
exports.countAccountsByRoleId = countAccountsByRoleId;
// Xóa nhóm quyền (xoá mềm)
const deleteRole = async (id) => {
    try {
        const sql = 'CALL delete_role(?)';
        return await (0, api_Provider_1.db_Provider)(sql, [id], true);
    }
    catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
exports.deleteRole = deleteRole;
// Tìm kiếm môn học có phân trang
const searchRoles = async (model) => {
    try {
        const sql = 'CALL get_roles(?,?,?,?)';
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
exports.searchRoles = searchRoles;
