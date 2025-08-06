"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRolePermissionsService = exports.updatePermissionsForRoleService = exports.deleteRoleService = exports.searchRoleService = exports.updateRoleService = exports.createRoleService = void 0;
const role_repository_1 = require("../repositories/role.repository");
const permission_repository_1 = require("../repositories/permission.repository");
const createRoleService = async (model) => {
    try {
        // Validate input
        if (!model.id?.trim())
            throw new Error('id nhóm quyền không được để trống');
        if (!model.name?.trim())
            throw new Error('Tên nhóm quyền không được để trống');
        // Save
        const result = await (0, role_repository_1.createRole)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi tạo nhóm quyền');
    }
};
exports.createRoleService = createRoleService;
const updateRoleService = async (model) => {
    try {
        if (!model.id?.trim())
            throw new Error('id nhóm quyền không được để trống');
        if (!model.name?.trim())
            throw new Error('Tên nhóm quyền không được để trống');
        const result = await (0, role_repository_1.updateRole)(model);
        return result;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi cập nhật nhóm quyền');
    }
};
exports.updateRoleService = updateRoleService;
const searchRoleService = async (model) => {
    try {
        return await (0, role_repository_1.searchRoles)(model);
    }
    catch (error) {
        throw new Error('Không thể tìm kiếm nhóm quyền');
    }
};
exports.searchRoleService = searchRoleService;
const deleteRoleService = async (id) => {
    try {
        // Bước 1: Kiểm tra ràng buộc nghiệp vụ
        const accountCount = await (0, role_repository_1.countAccountsByRoleId)(id);
        // Nếu có tài khoản, ném ra một lỗi nghiệp vụ cụ thể
        if (accountCount > 0) {
            throw new Error(`Không thể xóa vai trò này. Hiện đang có ${accountCount} tài khoản thuộc vai trò này.`);
        }
        // Bước 2: Nếu không có ràng buộc, thực hiện hành động
        const deleteResult = await (0, role_repository_1.deleteRole)(id);
        // Giả sử procedure trả về { details: [{ result: 1 }] } khi thành công
        if (deleteResult?.details?.[0]?.result === 1) {
            return { success: true, message: 'Xóa vai trò thành công.' };
        }
        else {
            // Trường hợp procedure chạy nhưng không thành công (vd: trả về -1)
            throw new Error('Xóa vai trò thất bại do lỗi từ cơ sở dữ liệu.');
        }
    }
    catch (error) {
        throw error;
    }
};
exports.deleteRoleService = deleteRoleService;
const updatePermissionsForRoleService = async (roleId, permissionIds) => {
    try {
        if (!roleId) {
            throw new Error("ID của vai trò không được để trống.");
        }
        // Kiểm tra permissionIds phải là một mảng
        if (!Array.isArray(permissionIds)) {
            throw new Error("Danh sách quyền không hợp lệ.");
        }
        // Hàm repository giờ trả về true/false
        return await (0, permission_repository_1.updatePermissionsForRole)(roleId, permissionIds);
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi cập nhật phân quyền');
    }
};
exports.updatePermissionsForRoleService = updatePermissionsForRoleService;
/**
 * Service để lấy danh sách các quyền đã gán cho một vai trò.
 * @param roleId ID của vai trò
 * @returns Một mảng các ID của các mục phân quyền (decentralization_id)
 */
const getRolePermissionsService = async (roleId) => {
    try {
        if (!roleId) {
            throw new Error("ID của vai trò không được để trống.");
        }
        // 1. Gọi repository để lấy dữ liệu đầy đủ từ CSDL
        const fullPermissionsInfo = await (0, permission_repository_1.getPermissionsByRole)(roleId);
        // 2. Chỉ trích xuất ra ID của các quyền (decentralization_id)
        //    Frontend chỉ cần thông tin này để tick vào checkbox
        const permissionIds = fullPermissionsInfo.map((p) => p.decentralization_id);
        return permissionIds;
    }
    catch (error) {
        throw new Error(error.message || 'Lỗi khi lấy danh sách quyền của vai trò');
    }
};
exports.getRolePermissionsService = getRolePermissionsService;
