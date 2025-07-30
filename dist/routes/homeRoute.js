"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = require("../controllers/home/get-subject-with-lesson/route");
const route_2 = require("../controllers/home/get_chapter_subhect_by_idSubject/route");
const route_3 = require("../controllers/home/get_lesson_detail_by_id/route");
const route_4 = require("../controllers/home/get_blog_by_id/route");
const HomeRoutes = express_1.default.Router();
HomeRoutes.get('/get-subject-with-lesson', route_1.getSubjectsWithLessonsHandler);
HomeRoutes.get('/get_chapter_subhect_by_idSubject', route_2.getChapterSubjectByIdHandler);
HomeRoutes.get('/get_lesson_detail_by_id', route_3.getLessonDetailByIdHandler);
HomeRoutes.get('/get_blog_by_id', route_4.getBlogByIdHandler);
exports.default = HomeRoutes;
