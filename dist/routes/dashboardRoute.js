"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/dashboard.routes.ts
const dashboard_controller_1 = require("../controllers/dashboard/dashboard.controller");
const express_1 = require("express");
const dashboardRoutes = (0, express_1.Router)();
dashboardRoutes.get('/stats', dashboard_controller_1.getDashboardStats);
dashboardRoutes.get('/blog-views', dashboard_controller_1.getBlogViews);
exports.default = dashboardRoutes;
