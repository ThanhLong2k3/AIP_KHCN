"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_exam_controller_1 = require("../controllers/exam/create_exam.controller");
const get_exam_created_by_controller_1 = require("../controllers/exam/get_exam_created_by.controller");
const search_exam_controller_1 = require("../controllers/exam/search_exam.controller");
const delete_exam_controller_1 = require("../controllers/exam/delete_exam.controller");
const update_exam_controller_1 = require("../controllers/exam/update_exam.controller");
const examRoutes = express_1.default.Router();
examRoutes.get('/authors', get_exam_created_by_controller_1.getExamCreatedByName);
examRoutes.post('/create', create_exam_controller_1.createExam);
examRoutes.post('/search', search_exam_controller_1.searchExam);
examRoutes.post('/delete', delete_exam_controller_1.deleteExam);
examRoutes.post('/update', update_exam_controller_1.updateExam);
exports.default = examRoutes;
