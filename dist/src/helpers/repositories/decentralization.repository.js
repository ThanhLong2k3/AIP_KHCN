"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDecentralizations = void 0;
const api_Provider_1 = require("../../config/api_Provider");
// lấy ra phân quyền
const searchDecentralizations = async () => {
    try {
        const sql = 'CALL get_decentralizations()';
        const results = await (0, api_Provider_1.db_Provider)(sql);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.searchDecentralizations = searchDecentralizations;
