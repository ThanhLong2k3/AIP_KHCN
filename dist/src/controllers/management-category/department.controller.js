"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.addDepartment = exports.getDepartments = void 0;
const api_Provider_1 = require("../../config/api_Provider");
const db_1 = require("../../config/db");
// Lấy danh sách đơn vị
const getDepartments = async (req, res) => {
    const { pageIndex = "1", pageSize = "10", orderType = "ASC", departmentName, } = req.query;
    try {
        const pageIndexNum = Number(pageIndex) || 1;
        const pageSizeNum = Number(pageSize) || 10;
        const validOrderType = orderType.toUpperCase() === "DESC" ? "DESC" : "ASC";
        await (0, api_Provider_1.db_Provider)("CALL GetDepartmentByPageOrder(?, ?, ?, ?)", [
            pageIndexNum,
            pageSizeNum,
            validOrderType,
            departmentName,
        ], false, res);
    }
    catch (error) {
        console.error("Lỗi khi lấy danh sách đơn vị:", error);
        res.status(500).json({ error: "Không thể lấy danh sách đơn vị." });
    }
};
exports.getDepartments = getDepartments;
// Thêm đơn vị mới
const addDepartment = async (req, res) => {
    const body = req.body;
    try {
        const Description = body.Description ? body.Description.trim() : null;
        const existingDepartments = await (0, db_1.executeQuery)(`SELECT * FROM Department WHERE DepartmentName = ? AND IsDeleted = 0`, [body.DepartmentName.trim()]);
        if (existingDepartments.length > 0) {
            return res.status(200).json({ result: -1 });
        }
        await (0, api_Provider_1.db_Provider)("CALL AddDepartment(?, ?)", [body.DepartmentName.trim(), Description], true, res);
    }
    catch (error) {
        console.error("Lỗi khi thêm đơn vị:", error);
        res.status(500).json({ error: "Không thể thêm đơn vị." });
    }
};
exports.addDepartment = addDepartment;
// Cập nhật đơn vị
const updateDepartment = async (req, res) => {
    const body = req.body;
    try {
        const Description = body.Description ? body.Description.trim() : null;
        const existingDepartment = await (0, db_1.executeQuery)(`SELECT * FROM Department WHERE DepartmentName = ? AND Id <> ? AND IsDeleted = 0`, [body.DepartmentName.trim(), body.Id]);
        if (existingDepartment.length > 0) {
            return res.status(200).json({ result: -1 });
        }
        await (0, api_Provider_1.db_Provider)("CALL UpdateDepartment(?, ?, ?)", [body.Id, body.DepartmentName.trim(), Description], true, res);
    }
    catch (error) {
        console.error("Lỗi khi cập nhật đơn vị:", error);
        res.status(500).json({ error: "Không thể cập nhật đơn vị." });
    }
};
exports.updateDepartment = updateDepartment;
// Xóa đơn vị
const deleteDepartment = async (req, res) => {
    const { id } = req.query;
    try {
        if (!id) {
            return res.status(400).json({ error: "Missing ID" });
        }
        await (0, api_Provider_1.db_Provider)("CALL DeleteDepartment(?)", [id], true, res);
    }
    catch (error) {
        console.error("Lỗi khi xóa đơn vị:", error);
        res.status(500).json({ error: "Không thể xóa đơn vị." });
    }
};
exports.deleteDepartment = deleteDepartment;
