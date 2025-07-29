import express from "express";
import { createExam } from "../controllers/exam/create_exam.controller";
import { getExamCreatedByName } from "../controllers/exam/get_exam_created_by.controller";
import { searchExam } from "../controllers/exam/search_exam.controller";
import { deleteExam } from "../controllers/exam/delete_exam.controller";
import { updateExam } from "../controllers/exam/update_exam.controller";

const examRoutes = express.Router();

examRoutes.get('/authors', getExamCreatedByName);
examRoutes.post('/create', createExam);
examRoutes.post('/search', searchExam);
examRoutes.post('/delete', deleteExam);
examRoutes.post('/update', updateExam);

export default examRoutes;