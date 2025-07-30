"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_blog_by_id = exports.get_lesson_detail_by_id = exports.get_chapter_subhect_by_idSubject = exports.GetSubjectsWithLessons = void 0;
const api_Provider_1 = require("../../config/api_Provider");
const GetSubjectsWithLessons = async () => {
    try {
        const sql = 'CALL get_subjects_with_lessons()';
        const results = await (0, api_Provider_1.db_Provider)(sql);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetSubjectsWithLessons = GetSubjectsWithLessons;
const get_chapter_subhect_by_idSubject = async (id) => {
    try {
        const sql = 'CALL get_chapter_subhect_by_idSubject(?)';
        const results = await (0, api_Provider_1.db_Provider)(sql, [id]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.get_chapter_subhect_by_idSubject = get_chapter_subhect_by_idSubject;
const get_lesson_detail_by_id = async (id) => {
    try {
        const sql = 'CALL get_lesson_detail_by_id(?)';
        const results = await (0, api_Provider_1.db_Provider)(sql, [id]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.get_lesson_detail_by_id = get_lesson_detail_by_id;
const get_blog_by_id = async (id) => {
    try {
        const sql = 'CALL get_blog_by_id(?)';
        const results = await (0, api_Provider_1.db_Provider)(sql, [id]);
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.get_blog_by_id = get_blog_by_id;
