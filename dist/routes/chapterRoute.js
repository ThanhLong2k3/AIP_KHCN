"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_chapter_controller_1 = require("../controllers/chapter/search_chapter.controller");
const delete_chapter_controller_1 = require("../controllers/chapter/delete_chapter.controller");
const update_chapter_controller_1 = require("../controllers/chapter/update_chapter.controller");
const create_chapter_controller_1 = require("../controllers/chapter/create_chapter.controller");
const chapterRoutes = express_1.default.Router();
chapterRoutes.post('/create', create_chapter_controller_1.createChapter);
chapterRoutes.post('/search', search_chapter_controller_1.searchChapter);
chapterRoutes.post('/delete', delete_chapter_controller_1.deleteChapter);
chapterRoutes.post('/update', update_chapter_controller_1.updateChapter);
exports.default = chapterRoutes;
