"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.actionsAccess = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const env_1 = __importDefault(require("../env"));
exports.actionsAccess = {
    VIEW_PAYMENT: 'view_payment',
};
const decrypt = (encrypted) => {
    const result = crypto_js_1.default.AES.decrypt(encrypted, env_1.default.ENCRYPTION_KEY).toString(crypto_js_1.default.enc.Utf8);
    return result ? JSON.parse(result) : '';
};
exports.decrypt = decrypt;
