"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyToken = exports.generateToken = exports.decrypt = exports.encrypt = exports.actionsAccess = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const jose_1 = require("jose");
const env_1 = __importDefault(require("./env"));
exports.actionsAccess = {
    VIEW_PAYMENT: 'view_payment',
};
const encrypt = (value) => {
    return crypto_js_1.default.AES.encrypt(JSON.stringify(value), env_1.default.ENCRYPTION_KEY).toString();
};
exports.encrypt = encrypt;
const decrypt = (encrypted) => {
    // console.log(env.ENCRYPTION_KEY);
    const result = crypto_js_1.default.AES.decrypt(encrypted, env_1.default.ENCRYPTION_KEY).toString(crypto_js_1.default.enc.Utf8);
    return result ? JSON.parse(result) : '';
};
exports.decrypt = decrypt;
const generateToken = async (payload, expiresIn = env_1.default.JWT_EXPIRES_IN) => {
    const secret = new TextEncoder().encode(env_1.default.JWT_SECRET);
    const token = await new jose_1.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secret);
    return token;
};
exports.generateToken = generateToken;
const verifyToken = async (token) => {
    try {
        const secret = new TextEncoder().encode(env_1.default.JWT_SECRET);
        const { payload } = await (0, jose_1.jwtVerify)(token, secret); // Verify the token
        return payload; // JWT payload if valid
    }
    catch {
        return null;
    }
};
exports.verifyToken = verifyToken;
const generateRefreshToken = async (payload) => {
    const secret = new TextEncoder().encode(env_1.default.JWT_REFRESH_SECRET);
    const token = await new jose_1.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(env_1.default.JWT_REFRESH_EXPIRES_IN)
        .sign(secret);
    return token;
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = async (token) => {
    try {
        const secret = new TextEncoder().encode(env_1.default.JWT_REFRESH_SECRET);
        const { payload } = await (0, jose_1.jwtVerify)(token, secret); // Verify the token
        return payload; // JWT payload if valid
    }
    catch {
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
