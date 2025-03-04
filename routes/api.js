import express from 'express';
import { logger } from "../config/winston.js";
import * as UGI from '../controllers/reports/UGIReportController.js';
import * as IgG from '../controllers/reports/IgGReportController.js';
import * as report from '../controllers/reports/ReportController.js';
import * as chall from '../controllers/challenge/dataController.js';
import * as pdf from '../controllers/challenge/pdfController.js';
import * as test from '../controllers/test/testController.js';
/////////////////
import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// __dirname 설정 (ES 모듈에서는 __dirname이 기본적으로 없으므로)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

logger.info("biocom_api_system_start.");

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// 리포트 All Users List api
router.get('/UGIReport/list', asyncHandler(report.getUgiList));
router.get('/IgGReport/list', asyncHandler(report.getIgGList));

// 유기산 리포트 api
router.get('/UGIReport', asyncHandler(UGI.getReportData));
router.get('/UGIReport/suppl', asyncHandler(UGI.getSuppleData));

// IgG 리포트 api
router.get('/IgGReport', asyncHandler(IgG.getReportData));
router.post('/IgGReport/insertLevels', asyncHandler(IgG.insertLevels));
router.get('/IgGReport/levels', asyncHandler(IgG.getLevels));

// test api
router.get('/test/questionnaire', asyncHandler(test.getQuestionnaireList));
router.get('/test/searchQuestionnaire', asyncHandler(test.getSearchQuestionnaireList));
router.get('/test/userQuestionnaire', asyncHandler(test.getUserQuestionnaireList));

// 날짜 기반 검사 key 반환환
router.get('/ugiIdByDate', asyncHandler(UGI.getUgiIdByDate));
router.get('/iggIdByDate', asyncHandler(IgG.getIgGIdByDate));


// 챌린지 관련 api
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
