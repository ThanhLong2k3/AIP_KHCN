"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBlogById = exports.getlessonDetailById = exports.GetChapterSubhectByIdSubject = exports.GetSubjectsWithLessonsService = void 0;
const home_repository_1 = require("../repositories/home.repository");
const GetSubjectsWithLessonsService = async () => {
    try {
        return await (0, home_repository_1.GetSubjectsWithLessons)();
    }
    catch (error) {
        throw new Error('Không thể lấy thông tin môn học và bài học: ');
    }
};
exports.GetSubjectsWithLessonsService = GetSubjectsWithLessonsService;
const GetChapterSubhectByIdSubject = async (id) => {
    try {
        return await (0, home_repository_1.get_chapter_subhect_by_idSubject)(id);
    }
    catch (error) {
        throw new Error('Không thể lấy thông tin chương và bài học: ');
    }
};
exports.GetChapterSubhectByIdSubject = GetChapterSubhectByIdSubject;
const getlessonDetailById = async (id) => {
    try {
        return await (0, home_repository_1.get_lesson_detail_by_id)(id);
    }
    catch (error) {
        throw new Error('Không thể lấy thông tin chương và bài học: ');
    }
};
exports.getlessonDetailById = getlessonDetailById;
const GetBlogById = async (id) => {
    try {
        return await (0, home_repository_1.get_blog_by_id)(id);
    }
    catch (error) {
        throw new Error('Không thể lấy thông tin BÀI VIẾT ');
    }
};
exports.GetBlogById = GetBlogById;
