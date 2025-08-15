"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const UPLOAD_DIR = path_1.default.join(process.cwd(), 'uploads');
// Tạo thư mục nếu chưa có
if (!fs_1.default.existsSync(UPLOAD_DIR)) {
    fs_1.default.mkdirSync(UPLOAD_DIR, { recursive: true });
}
const uploadFiles = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
        const files = req.files;
        const uploadedUrls = [];
        for (const file of files) {
            const originalName = file.originalname;
            const timestampedName = `${Date.now()}-${originalName}`;
            const filePath = path_1.default.join(UPLOAD_DIR, timestampedName);
            // Di chuyển file từ bộ nhớ tạm sang thư mục đích
            fs_1.default.renameSync(file.path, filePath);
            uploadedUrls.push(`/uploads/${timestampedName}`);
        }
        return res.status(200).json({ urls: uploadedUrls });
    }
    catch (error) {
        console.error('File upload error:', error);
        return res.status(500).json({ error: error.message || 'Lỗi máy chủ' });
    }
};
exports.uploadFiles = uploadFiles;
