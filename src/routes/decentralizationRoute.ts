import express from "express";
import { searchDecentralization } from "../controllers/decentralization/search_decentralization.controller";


const decentralizationRoutes = express.Router();

decentralizationRoutes.post('/search', searchDecentralization);

export default decentralizationRoutes;