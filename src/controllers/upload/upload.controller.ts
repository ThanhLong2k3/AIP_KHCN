import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Tạo thư mục nếu chưa có
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const uploadFiles = async (req: Request, res: Response) => {
    try {
        if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const files = req.files as Express.Multer.File[];
        const uploadedUrls: string[] = [];

        for (const file of files) {
            const originalName = file.originalname;
            const timestampedName = `${Date.now()}-${originalName}`;
            const filePath = path.join(UPLOAD_DIR, timestampedName);

            // Di chuyển file từ bộ nhớ tạm sang thư mục đích
            fs.renameSync(file.path, filePath);

            uploadedUrls.push(`/uploads/${timestampedName}`);
        }

        return res.status(200).json({ urls: uploadedUrls });
    } catch (error: any) {
        console.error('File upload error:', error);
        return res.status(500).json({ error: error.message || 'Lỗi máy chủ' });
    }
};
