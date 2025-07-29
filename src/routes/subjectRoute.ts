import express from "express";
import { searchSubject } from "../controllers/subject/search_subject.controllter";
import { updateSubject } from "../controllers/subject/update_subject.controllter";
import { createSubject } from "../controllers/subject/create_subject.controllter";
import { deleteSubject } from "../controllers/subject/delete_subject.controllter";


const subjectRoutes = express.Router();

subjectRoutes.post('/create', createSubject);
subjectRoutes.post('/search', searchSubject);
subjectRoutes.post('/delete', deleteSubject);
subjectRoutes.post('/update', updateSubject);

export default subjectRoutes;