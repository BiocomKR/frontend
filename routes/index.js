import express from 'express';
import apiRoutes from './api.js';
import reportRoutes from './report.js';
import challengeRoutes from './challenge.js';

const router = express.Router();

router.use('/api', apiRoutes);
router.use('/report', reportRoutes);
router.use('/challenge', challengeRoutes);

export default router;
