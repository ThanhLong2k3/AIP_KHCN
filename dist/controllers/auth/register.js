"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAccount = void 0;
const account_service_1 = require("../../helpers/services/account.service");
const env_1 = __importDefault(require("../../env"));
// Đăng ký tài khoản học sinh
const registerAccount = async (req, res) => {
    try {
        const DEFAULT_STUDENT_ROLE_ID = env_1.default.ID_ROLE_STUDENT; // ID quyền học sinh
        const model = req.body;
        const result = await (0, account_service_1.registerAccountService)({
            ...model,
            role_id: DEFAULT_STUDENT_ROLE_ID,
        });
        return res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error('API Error in POST /api/auth/register:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
exports.registerAccount = registerAccount;
