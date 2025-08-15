"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_subject_controllter_1 = require("../controllers/subject/search_subject.controllter");
const update_subject_controllter_1 = require("../controllers/subject/update_subject.controllter");
const create_subject_controllter_1 = require("../controllers/subject/create_subject.controllter");
const delete_subject_controllter_1 = require("../controllers/subject/delete_subject.controllter");
const subjectRoutes = express_1.default.Router();
subjectRoutes.post('/create', create_subject_controllter_1.createSubject);
subjectRoutes.post('/search', search_subject_controllter_1.searchSubject);
subjectRoutes.post('/delete', delete_subject_controllter_1.deleteSubject);
subjectRoutes.post('/update', update_subject_controllter_1.updateSubject);
exports.default = subjectRoutes;
