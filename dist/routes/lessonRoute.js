"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_lesson_controller_1 = require("../controllers/lesson/create_lesson.controller");
const search_lesson_controller_1 = require("../controllers/lesson/search_lesson.controller");
const delete_lesson_controller_1 = require("../controllers/lesson/delete_lesson.controller");
const update_lesson_controller_1 = require("../controllers/lesson/update_lesson.controller");
const lessonRoutes = express_1.default.Router();
lessonRoutes.post('/create', create_lesson_controller_1.createLesson);
lessonRoutes.post('/search', search_lesson_controller_1.searchLesson);
lessonRoutes.post('/delete', delete_lesson_controller_1.deleteLesson);
lessonRoutes.post('/update', update_lesson_controller_1.updateLesson);
exports.default = lessonRoutes;
