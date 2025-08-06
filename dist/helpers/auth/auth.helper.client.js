"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountLogin = void 0;
const jwt_decode_1 = require("jwt-decode");
const getAccountLogin = () => {
    try {
        const token = localStorage.getItem('TOKEN');
        if (!token)
            return null;
        const accountInfo = (0, jwt_decode_1.jwtDecode)(token);
        return accountInfo;
    }
    catch (error) {
        console.error("Lỗi giải mã token:", error);
        localStorage.removeItem('TOKEN');
        return null;
    }
};
exports.getAccountLogin = getAccountLogin;
