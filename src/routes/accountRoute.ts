import express from "express";
import { deleteAccount } from "../controllers/account/delete_account.controller";
import { createAccount } from "../controllers/account/create_account.controller";
import { updateAccount } from "../controllers/account/update_account.controller";
import { searchAccount } from "../controllers/account/search_account.controller";
import { updateProfile } from "../controllers/account/updateProfile.controller";
import { verifyPassword } from "../controllers/account/verifyPassword.controller";


const accountRoutes = express.Router();

accountRoutes.post('/update-profile', updateProfile);
accountRoutes.post('/verify-password', verifyPassword);

accountRoutes.post('/search', searchAccount);
accountRoutes.post("/create", createAccount);
accountRoutes.post('/update', updateAccount);
accountRoutes.post("/delete", deleteAccount);


export default accountRoutes;