"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.js
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const accountRoute_1 = __importDefault(require("./routes/accountRoute"));
const advisoryMemberRoute_1 = __importDefault(require("./routes/advisoryMemberRoute"));
const blogRoute_1 = __importDefault(require("./routes/blogRoute"));
const chapterRoute_1 = __importDefault(require("./routes/chapterRoute"));
const decentralizationRoute_1 = __importDefault(require("./routes/decentralizationRoute"));
const examRoute_1 = __importDefault(require("./routes/examRoute"));
const lessonRoute_1 = __importDefault(require("./routes/lessonRoute"));
const roleRoute_1 = __importDefault(require("./routes/roleRoute"));
const subjectRoute_1 = __importDefault(require("./routes/subjectRoute"));
const homeRoute_1 = __importDefault(require("./routes/homeRoute"));
const uploadRoute_1 = __importDefault(require("./routes/uploadRoute"));
const path_1 = __importDefault(require("path"));
require("module-alias/register"); // thêm ở dòng đầu tiên
dotenv_1.default.config();
const app = (0, express_1.default)();
// Cấu hình CORS
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Role"], // Thêm "Role" vào đây
    credentials: true,
};
// Middleware xử lý OPTIONS
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        return res.status(200).end();
    }
    next();
});
// Áp dụng CORS middleware cho tất cả các request
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
// Routes
app.use("/api/auth", authRoute_1.default);
app.use("/api/account", accountRoute_1.default);
app.use("/api/advisory_member", advisoryMemberRoute_1.default);
app.use("/api/blog", blogRoute_1.default);
app.use("/api/chapter", chapterRoute_1.default);
app.use("/api/decentralization", decentralizationRoute_1.default);
app.use("/api/exam", examRoute_1.default);
app.use("/api/lesson", lessonRoute_1.default);
app.use("/api/role", roleRoute_1.default);
app.use("/api/subject", subjectRoute_1.default);
app.use("/api/home", homeRoute_1.default);
app.use("/api/upload", uploadRoute_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port http://localhost:${PORT}`);
});
