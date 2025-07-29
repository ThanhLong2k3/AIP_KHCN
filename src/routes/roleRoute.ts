import express from "express";
import { createRole } from "../controllers/role/create_role.controller";
import { searchRole } from "../controllers/role/search_role.controller";
import { deleteRole } from "../controllers/role/delete_role.controller";
import { updateRole } from "../controllers/role/update_role.controller";
import { updateRolePermissions } from "../controllers/role/update_permissions_role.controller";
import { getRolePermissions } from "../controllers/role/get_permissions_role.controller";

const roleRoutes = express.Router();

roleRoutes.post('/create', createRole);
roleRoutes.post('/search', searchRole);
roleRoutes.post('/delete', deleteRole);
roleRoutes.post('/update', updateRole);
roleRoutes.post('/update-permissions', updateRolePermissions);
roleRoutes.post('/get-permissions', getRolePermissions);

export default roleRoutes;