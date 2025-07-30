"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delete_account_controller_1 = require("../controllers/account/delete_account.controller");
const create_account_controller_1 = require("../controllers/account/create_account.controller");
const update_account_controller_1 = require("../controllers/account/update_account.controller");
const search_account_controller_1 = require("../controllers/account/search_account.controller");
const accountRoutes = express_1.default.Router();
accountRoutes.post('/search', search_account_controller_1.searchAccount);
accountRoutes.post("/create", create_account_controller_1.createAccount);
accountRoutes.post('/update', update_account_controller_1.updateAccount);
accountRoutes.post("/delete", delete_account_controller_1.deleteAccount);
exports.default = accountRoutes;
