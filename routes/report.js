import express from 'express';
import * as report from '../controllers/reports/ReportController.js'
import * as UGI from '../controllers/reports/UGIReportController.js';
import * as IgG from '../controllers/reports/IgGReportController.js';
// import * as log from '../controllers/loggingController.js'
import { logger } from "../config/winston.js";

const router = express.Router();

logger.info("biocom_report_system_start.");

// 비동기 에러 처리를 위한 래퍼 함수
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
// 리포트 관련 라우트
router.get('/insertInfo', asyncHandler(report.getInsertInfo));

// UGI 사용자 정보 전달 라우트 
router.post('/UGI', asyncHandler(UGI.postUserCheck));
router.get('/ugi', asyncHandler(UGI.getUgiApi))

// IgG 사용자 정보 전달 라우트 
router.post('/IgG', asyncHandler(IgG.getUserCheck));
router.get('/igg', asyncHandler(IgG.getIgGApi))

// 로그 관련 라우트
// router.get('/log', asyncHandler(log.getLog));
// router.get('/log/files', asyncHandler(log.getLogFiles));
// router.get('/content/:file', asyncHandler(log.getLogContent));

export default router;