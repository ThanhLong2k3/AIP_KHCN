"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_decentralization_controller_1 = require("../controllers/decentralization/search_decentralization.controller");
const decentralizationRoutes = express_1.default.Router();
decentralizationRoutes.post('/search', search_decentralization_controller_1.searchDecentralization);
exports.default = decentralizationRoutes;
