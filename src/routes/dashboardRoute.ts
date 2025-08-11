// src/routes/dashboard.routes.ts
import { getBlogViews, getDashboardStats } from '@/controllers/dashboard/dashboard.controller';
import { Router } from 'express';

const dashboardRoutes = Router();

dashboardRoutes.get('/stats', getDashboardStats);
dashboardRoutes.get('/blog-views', getBlogViews);


export default dashboardRoutes;