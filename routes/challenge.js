import express from 'express';
import { logger } from "../config/winston.js";
import * as chall from '../controllers/challenge/adminController.js';


const router = express.Router();

logger.info("biocom_challenge_system_start.");

// 비동기 에러 처리를 위한 래퍼 함수
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// 챌린지 관리자 페이지
router.get('/manager', asyncHandler(chall.getManagerData));
router.post('/saveChallengerData', asyncHandler(chall.saveChallengerData));
router.post('/saveMappingData', asyncHandler(chall.saveMappingData));
router.get('/loadData', asyncHandler(chall.loadAllData));


export default router;