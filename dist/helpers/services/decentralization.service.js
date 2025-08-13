"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDecentralizationService = void 0;
const decentralization_repository_1 = require("../repositories/decentralization.repository");
const searchDecentralizationService = async () => {
    try {
        return await (0, decentralization_repository_1.searchDecentralizations)();
    }
    catch (error) {
        throw new Error('Không thể tìm kiếm phân quyền');
    }
};
exports.searchDecentralizationService = searchDecentralizationService;
