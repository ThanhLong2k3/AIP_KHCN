import express from "express";
import { deleteAccount } from "../controllers/account/delete_account.controller";
import { createAccount } from "../controllers/account/create_account.controller";
import { updateAccount } from "../controllers/account/update_account.controller";
import { searchAccount } from "../controllers/account/search_account.controller";
import { updateProfileController } from "@/controllers/account/updateProfile.controller";
import { verifyPasswordController } from "@/controllers/account/verifyPassword.controller";


const accountRoutes = express.Router();

accountRoutes.post('/search', searchAccount);
accountRoutes.post("/create", createAccount);
accountRoutes.post('/update', updateAccount);
accountRoutes.post("/delete", deleteAccount);
accountRoutes.post('/update-profile', updateProfileController);
accountRoutes.post('/verify-password', verifyPasswordController);


export default accountRoutes;