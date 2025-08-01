"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPasswordController = void 0;
const account_service_1 = require("../../helpers/services/account.service");
const verifyPasswordController = async (req, res) => {
    try {
        const { username, currentPassword } = req.body;
        const result = await (0, account_service_1.verifyCurrentPasswordService)(username, currentPassword);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.verifyPasswordController = verifyPasswordController;
