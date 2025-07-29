import express from "express";
import { createLesson } from "../controllers/lesson/create_lesson.controller";
import { searchLesson } from "../controllers/lesson/search_lesson.controller";
import { deleteLesson } from "../controllers/lesson/delete_lesson.controller";
import { updateLesson } from "../controllers/lesson/update_lesson.controller";


const lessonRoutes = express.Router();

lessonRoutes.post('/create', createLesson);
lessonRoutes.post('/search', searchLesson);
lessonRoutes.post('/delete', deleteLesson);
lessonRoutes.post('/update', updateLesson);

export default lessonRoutes;