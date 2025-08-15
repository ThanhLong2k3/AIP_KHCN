import express from "express";
import { getSubjectsWithLessonsHandler } from "../controllers/home/get-subject-with-lesson/route";
import { getChapterSubjectByIdHandler } from "../controllers/home/get_chapter_subhect_by_idSubject/route";
import { getLessonDetailByIdHandler } from "../controllers/home/get_lesson_detail_by_id/route";
import { getBlogByIdHandler } from "../controllers/home/get_blog_by_id/route";
import { getExamSubjectByIdHandler } from "@/controllers/home/get_exam_by_id_subject/route";

const HomeRoutes = express.Router();

HomeRoutes.get('/get-subject-with-lesson', getSubjectsWithLessonsHandler);
HomeRoutes.get('/get_chapter_subhect_by_idSubject', getChapterSubjectByIdHandler);
HomeRoutes.get('/get_lesson_detail_by_id', getLessonDetailByIdHandler);
HomeRoutes.get('/get_blog_by_id', getBlogByIdHandler);
HomeRoutes.get('/get_exam_by_id_subject', getExamSubjectByIdHandler);


export default HomeRoutes;