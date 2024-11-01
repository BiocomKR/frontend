import express from 'express';
import apiRoutes from './api.js';
import reportRoutes from './report.js';

const router = express.Router();

router.use('/api', apiRoutes);
router.use('/report', reportRoutes);

export default router;
