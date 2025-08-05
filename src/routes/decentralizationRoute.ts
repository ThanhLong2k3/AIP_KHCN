import express from "express";
import { searchDecentralization } from "../controllers/decentralization/search_decentralization.controller";


const decentralizationRoutes = express.Router();

decentralizationRoutes.get('/search', searchDecentralization);

export default decentralizationRoutes;