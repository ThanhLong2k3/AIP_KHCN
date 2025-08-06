"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.registerAccount = exports.updatePasswordByEmail = exports.findAccountByEmail = exports.checkUsernameExists = exports.authenticate = exports.searchAccounts = exports.deleteAccount = exports.updateAccount = exports.createAccount = void 0;
const api_Provider_1 = require("../../config/api_Provider");
// Thêm tài khoản mới
const createAccount = async (model) => {
    try {
        const sql = 'CALL add_account(?,?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.username,
            model.password,
            model.image ?? null,
            model.name,
            model.role_id,
            model.email,
            model.created_by
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createAccount = createAccount;
// Cập nhật tài khoản
const updateAccount = async (model) => {
    try {
        console.log('Updating account:', model);
        const sql = 'CALL update_account(?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.username,
            model.image,
            model.name,
            model.role_id,
            model.email,
            model.updated_by
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateAccount = updateAccount;
// Xóa tài khoản (xoá mềm)
const deleteAccount = async (username, deletedBy) => {
    try {
        const sql = 'CALL delete_account(?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [username, deletedBy], true);
    }
    catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
exports.deleteAccount = deleteAccount;
// Tìm kiếm tài khoản có phân trang
const searchAccounts = async (model) => {
    try {
        const sql = 'CALL get_accounts(?,?,?,?,?)'; // 
        const name = model.search_content_1 || null;
        const roleName = model.search_content_2 || null;
        const results = await (0, api_Provider_1.db_Provider)(sql, [
            model.page_index ?? 1,
            model.page_size ?? 10,
            model.order_type ?? 'ASC',
            name,
            roleName
        ]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.searchAccounts = searchAccounts;
//lấy ra tài khoản theo tên đăng nhập (dùng cho login và so sánh mật khẩu)
const authenticate = async (username) => {
    try {
        const sql = 'CALL get_user_by_username(?)';
        const results = await (0, api_Provider_1.db_Provider)(sql, [username]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.authenticate = authenticate;
//kiểm tra xem tên đăng nhập đã tồn tại hay chưa (bao gồm cả tên đăng nhập đã bị xoá mềm)
const checkUsernameExists = async (username) => {
    try {
        const sql = 'CALL check_username_exists(?)';
        const results = await (0, api_Provider_1.db_Provider)(sql, [username]);
        return results.length > 0 ? results[0] : null;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.checkUsernameExists = checkUsernameExists;
const findAccountByEmail = async (email) => {
    try {
        const sql = 'CALL find_account_by_email(?)';
        const results = await (0, api_Provider_1.db_Provider)(sql, [email]);
        //trả về object tài khoản đầu tiên hoặc null
        return results.length > 0 ? results[0] : null;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.findAccountByEmail = findAccountByEmail;
const updatePasswordByEmail = async (email, hashedPassword) => {
    try {
        const sql = 'CALL update_password_by_email(?, ?)';
        //chỉ thực hiện UPDATE, không cần trả về kết quả cụ thể
        await (0, api_Provider_1.db_Provider)(sql, [email, hashedPassword], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updatePasswordByEmail = updatePasswordByEmail;
const registerAccount = async (model) => {
    try {
        const sql = 'CALL add_account_register(?,?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.username,
            model.password,
            model.image ?? null,
            model.name,
            model.role_id,
            model.email,
        ], true);
    }
    catch (error) {
        throw error;
    }
};
exports.registerAccount = registerAccount;
const updateProfile = async (model) => {
    try {
        const sql = 'CALL update_profile(?,?,?,?,?)';
        return await (0, api_Provider_1.db_Provider)(sql, [
            model.username ?? null,
            model.password ?? null,
            model.image ?? null,
            model.name ?? null,
            model.email ?? null
        ], true);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateProfile = updateProfile;
