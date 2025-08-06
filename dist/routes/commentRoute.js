"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_comment_controller_1 = require("../controllers/comment/create_comment.controller");
const delete_comment_controller_1 = require("../controllers/comment/delete_comment.controller");
const search_comment_controller_1 = require("../controllers/comment/search_comment.controller");
const express_1 = __importDefault(require("express"));
const commentRoutes = express_1.default.Router();
commentRoutes.post('/create', create_comment_controller_1.createComment);
commentRoutes.post('/search', search_comment_controller_1.searchComment);
commentRoutes.post('/delete', delete_comment_controller_1.deleteComment);
exports.default = commentRoutes;
