"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const account_service_1 = require("../../helpers/services/account.service");
const updateProfile = async (req, res) => {
    try {
        const { username, model } = req.body;
        const result = await (0, account_service_1.updateProfileService)(username, model);
        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateProfile = updateProfile;
