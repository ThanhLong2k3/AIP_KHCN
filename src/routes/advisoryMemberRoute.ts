import express from "express";
import { searchAdvisoryMember } from "../controllers/advisory_member/search_advisoryMember.controller";
import { createAdvisoryMember } from "../controllers/advisory_member/create_advisoryMember.controller";
import { updateAdvisoryMember } from "../controllers/advisory_member/update_advisoryMember.controller";
import { deleteAdvisoryMember } from "../controllers/advisory_member/delete_advisoryMember.controller";


const advisoryMemberRoutes = express.Router();

advisoryMemberRoutes.post("/search", searchAdvisoryMember);
advisoryMemberRoutes.post("/create", createAdvisoryMember);
advisoryMemberRoutes.post("/update", updateAdvisoryMember);
advisoryMemberRoutes.post("/delete", deleteAdvisoryMember);


export default advisoryMemberRoutes;