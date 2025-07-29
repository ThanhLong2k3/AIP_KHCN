import express from "express";
import { searchBlog } from "../controllers/blog/search_blog.controller";
import { createBlog } from "../controllers/blog/create_blog.controller";
import { deleteBlog } from "../controllers/blog/delete_blog.controller";
import { getBlogAuthors } from "../controllers/blog/getAuthors_blog.controller";
import { updateBlog } from "../controllers/blog/update_blog.controller";


const blogRoutes = express.Router();

blogRoutes.get('/authors', getBlogAuthors);
blogRoutes.post('/create', createBlog);
blogRoutes.post('/search', searchBlog);
blogRoutes.post('/delete', deleteBlog);
blogRoutes.post('/update', updateBlog);

export default blogRoutes;