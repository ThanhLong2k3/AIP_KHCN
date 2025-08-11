// app.js
import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute";
import dotenv from "dotenv";
import accountRoutes from "./routes/accountRoute";
import advisoryMemberRoutes from "./routes/advisoryMemberRoute";
import blogRoutes from "./routes/blogRoute";
import chapterRoutes from "./routes/chapterRoute";
import decentralizationRoutes from "./routes/decentralizationRoute";
import examRoutes from "./routes/examRoute";
import lessonRoutes from "./routes/lessonRoute";
import roleRoutes from "./routes/roleRoute";
import subjectRoutes from "./routes/subjectRoute";
import HomeRoutes from "./routes/homeRoute";
import uploadRoutes from "./routes/uploadRoute";
import path from "path";
import commentRoutes from "./routes/commentRoute";
import dashboardRoutes from "./routes/dashboardRoute";


dotenv.config();

const app = express();

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
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/account", accountRoutes);
app.use("/api/advisory_member", advisoryMemberRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/chapter", chapterRoutes);
app.use("/api/decentralization", decentralizationRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/lesson", lessonRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/home", HomeRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/comment", commentRoutes);
app.use('/api/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port http://localhost:${PORT}`);
});
