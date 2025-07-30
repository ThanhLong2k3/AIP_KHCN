"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePermissionsForRole = exports.checkPermission = exports.getPermissionsByRole = void 0;
const api_Provider_1 = require("../../config/api_Provider");
/**
 * Lấy toàn bộ thông tin phân quyền của một vai trò (role)
 * @param roleId ID của vai trò cần lấy thông tin
 */
const getPermissionsByRole = async (roleId) => {
    try {
        const sql = 'CALL get_role_decentralizations_by_role(?)';
        const results = await (0, api_Provider_1.db_Provider)(sql, [roleId]);
        return results;
    }
    catch (error) {
        console.error(`Lỗi khi lấy phân quyền cho roleId ${roleId}:`, error);
        throw new Error(error.message);
    }
};
exports.getPermissionsByRole = getPermissionsByRole;
/**
 * Kiểm tra xem một vai trò có một quyền cụ thể hay không.
 * @param roleId ID của vai trò
 * @param permissionCode Mã quyền cần kiểm tra (ví dụ: 'USER_MANAGE')
 */
const checkPermission = async (roleId, permissionCode) => {
    try {
        // Thủ tục này bạn cần tạo trong DB
        const sql = 'CALL check_role_permission(?, ?)';
        const result = await (0, api_Provider_1.db_Provider)(sql, [roleId, permissionCode]);
        if (result && result.length > 0) {
            return result[0].has_permission === 1;
        }
        return false;
    }
    catch (error) {
        console.error('Lỗi khi kiểm tra quyền:', error);
        throw new Error(error.message);
    }
};
exports.checkPermission = checkPermission;
/**
 * Cập nhật toàn bộ danh sách quyền cho một vai trò.
 * @param roleId ID của vai trò cần cập nhật
 * @param permissionIds Một mảng các ID quyền
 */
// File: src/helpers/repositories/permission.repository.ts
const updatePermissionsForRole = async (roleId, permissionIds) => {
    try {
        const idsString = permissionIds.join(',');
        const sql = 'CALL update_role_permissions(?, ?)';
        // Chúng ta không cần quan tâm đến kết quả trả về nữa
        // Chỉ cần biết nó có chạy thành công không
        await (0, api_Provider_1.db_Provider)(sql, [roleId, idsString]);
        // Nếu dòng trên không ném ra lỗi, có nghĩa là đã thành công
        return true;
    }
    catch (error) {
        console.error(`Lỗi khi cập nhật quyền cho roleId ${roleId}:`, error);
        // Nếu có lỗi, trả về false
        return false;
    }
};
exports.updatePermissionsForRole = updatePermissionsForRole;
