import { createComment } from "@/controllers/comment/create_comment.controller";
import { deleteComment } from "@/controllers/comment/delete_comment.controller";
import { searchComment } from "@/controllers/comment/search_comment.controller";
import express from "express";

const commentRoutes = express.Router();

commentRoutes.post('/create', createComment);
commentRoutes.post('/search', searchComment);
commentRoutes.post('/delete', deleteComment);

export default commentRoutes;