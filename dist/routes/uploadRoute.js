"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_controller_1 = require("../controllers/upload/upload.controller");
const multer_1 = __importDefault(require("multer"));
const uploadRoutes = express_1.default.Router();
// Multer cấu hình để lưu file vào thư mục tạm
const upload = (0, multer_1.default)({ dest: 'temp/' });
uploadRoutes.post("/", upload.array("files"), upload_controller_1.uploadFiles);
exports.default = uploadRoutes;
