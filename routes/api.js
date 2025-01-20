import express from 'express';
import { logger } from "../config/winston.js";
import * as UGI from '../controllers/reports/UGIReportController.js';
import * as report from '../controllers/reports/ReportController.js';
import * as chall from '../controllers/challenge/dataController.js';
import * as pdf from '../controllers/challenge/pdfController.js';

const router = express.Router();

logger.info("biocom_api_system_start.");

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// 유기산 리포트 api
router.get('/UGIReport', asyncHandler(UGI.getReportData));
// router.post('/UGIReport/pdf', asyncHandler(UGI.generatePDF));
router.get('/UGIReport/list', asyncHandler(report.getUgiList));
router.get('/UGIReport/suppl', asyncHandler(UGI.getSuppleData));

router.post('/chall/challanger', chall.getUsersData);
router.post('/chall/saveData', chall.setUsersData);

router.get('/report/food_report/:filename', pdf.getFoodReport);
router.get('/report/food_solution/:filename', pdf.getFoodSolution);
router.get('/report/hormone_report/:filename', pdf.getHormoneReport);
router.get('/report/hormone_solution/:filename', pdf.getHormoneSolution);
router.get('/report/ugi_report/:filename', pdf.getUgiReport);
router.get('/report/ugi_solution/:filename', pdf.getUgiSolution);
router.get('/report/challenge_img/:filename', pdf.getChallImg);


export default router
