import express from "express";
import { searchChapter } from "../controllers/chapter/search_chapter.controller";
import { deleteChapter } from "../controllers/chapter/delete_chapter.controller";
import { updateChapter } from "../controllers/chapter/update_chapter.controller";
import { createChapter } from "../controllers/chapter/create_chapter.controller";


const chapterRoutes = express.Router();

chapterRoutes.post('/create', createChapter);
chapterRoutes.post('/search', searchChapter);
chapterRoutes.post('/delete', deleteChapter);
chapterRoutes.post('/update', updateChapter);

export default chapterRoutes;