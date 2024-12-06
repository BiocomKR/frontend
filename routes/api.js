import express from 'express';
import { logger } from "../config/winston.js";
import * as UGI from '../controllers/reports/UGIReportController.js';
import * as report from '../controllers/reports/ReportController.js';

const router = express.Router();

logger.info("biocom_api_system_start.");

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// 유기산 리포트 api
router.get('/UGIReport', asyncHandler(UGI.getReportData));
// router.post('/UGIReport/pdf', asyncHandler(UGI.generatePDF));
router.get('/UGIReport/list', asyncHandler(report.getUgiList));
router.get('/UGIReport/suppl', asyncHandler(UGI.getSuppleData));

router.get('/lotte/api')
export default router
