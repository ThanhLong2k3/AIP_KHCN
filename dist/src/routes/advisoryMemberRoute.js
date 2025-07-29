"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_advisoryMember_controller_1 = require("../controllers/advisory_member/search_advisoryMember.controller");
const create_advisoryMember_controller_1 = require("../controllers/advisory_member/create_advisoryMember.controller");
const update_advisoryMember_controller_1 = require("../controllers/advisory_member/update_advisoryMember.controller");
const delete_advisoryMember_controller_1 = require("../controllers/advisory_member/delete_advisoryMember.controller");
const advisoryMemberRoutes = express_1.default.Router();
advisoryMemberRoutes.post("/search", search_advisoryMember_controller_1.searchAdvisoryMember);
advisoryMemberRoutes.post("/create", create_advisoryMember_controller_1.createAdvisoryMember);
advisoryMemberRoutes.post("/update", update_advisoryMember_controller_1.updateAdvisoryMember);
advisoryMemberRoutes.post("/delete", delete_advisoryMember_controller_1.deleteAdvisoryMember);
exports.default = advisoryMemberRoutes;
