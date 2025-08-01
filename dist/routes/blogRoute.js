"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_blog_controller_1 = require("../controllers/blog/search_blog.controller");
const create_blog_controller_1 = require("../controllers/blog/create_blog.controller");
const delete_blog_controller_1 = require("../controllers/blog/delete_blog.controller");
const getAuthors_blog_controller_1 = require("../controllers/blog/getAuthors_blog.controller");
const update_blog_controller_1 = require("../controllers/blog/update_blog.controller");
const blogRoutes = express_1.default.Router();
blogRoutes.get('/authors', getAuthors_blog_controller_1.getBlogAuthors);
blogRoutes.post('/create', create_blog_controller_1.createBlog);
blogRoutes.post('/search', search_blog_controller_1.searchBlog);
blogRoutes.post('/delete', delete_blog_controller_1.deleteBlog);
blogRoutes.post('/update', update_blog_controller_1.updateBlog);
exports.default = blogRoutes;
