import express from "express";
import { deleteAccount } from "../controllers/account/delete_account.controller";
import { createAccount } from "../controllers/account/create_account.controller";
import { updateAccount } from "../controllers/account/update_account.controller";
import { searchAccount } from "../controllers/account/search_account.controller";


const accountRoutes = express.Router();

accountRoutes.post('/search', searchAccount);
accountRoutes.post("/create", createAccount);
accountRoutes.post('/update', updateAccount);
accountRoutes.post("/delete", deleteAccount);


export default accountRoutes;