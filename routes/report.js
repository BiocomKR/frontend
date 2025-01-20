import express from 'express';
import * as UGI from '../controllers/reports/UGIReportController.js';
import * as report from '../controllers/reports/ReportController.js'
import * as log from '../controllers/loggingController.js'
import { logger } from "../config/winston.js";

const router = express.Router();

logger.info("biocom_report_system_start.");

// 비동기 에러 처리를 위한 래퍼 함수
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
// 리포트 관련 라우트
router.get('/insertInfo', asyncHandler(report.getInsertInfo));

// UGI 리포트 관련 라우트
router.post('/UGI', asyncHandler(UGI.getUserCheck));

// 로그 관련 라우트
router.get('/log', asyncHandler(log.getLog));
router.get('/log/files', asyncHandler(log.getLogFiles));
router.get('/content/:file', asyncHandler(log.getLogContent));

export default router;