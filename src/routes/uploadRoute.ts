import express from "express";
import { uploadFiles } from "../controllers/upload/upload.controller";
import multer from "multer";

const uploadRoutes = express.Router();
// Multer cấu hình để lưu file vào thư mục tạm
const upload = multer({ dest: 'temp/' });
uploadRoutes.post("/", upload.array("files"), uploadFiles);

export default uploadRoutes;