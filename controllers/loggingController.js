import { logger } from '../config/winston.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 로그 파일 목록 가져오기 (내부 함수)
async function getLogFileList() {
    try {
        const logDir = process.env.LOG_DIR;
        const files = await fs.readdir(logDir);
        
        // .log 확장자를 가진 파일만 필터링
        const logFiles = files.filter(file => 
            file.endsWith('.log') && 
            !file.includes('audit.json') &&
            !file.includes('exception')
        );
        
        // 파일 날짜 기준으로 정렬 (최신 순)
        return logFiles.sort((a, b) => b.localeCompare(a));
    } catch (error) {
        logger.error('로그 파일 목록 조회 오류:', error);
        throw error;
    }
}
// 로그 뷰어 페이지 렌더링
export async function getLog(req, res) {
    try {
        const logFiles = await getLogFileList();
        res.render('log/viewer', { logFiles });
    } catch (error) {
        logger.error('로그 뷰어 렌더링 오류:', error);
        res.status(500).send('로그 파일 목록을 불러올 수 없습니다.');
    }
}
// API: 로그 파일 목록 조회
export async function getLogFiles(req, res) {
    try {
        const logFiles = await getLogFileList();
        res.json(logFiles);
    } catch (error) {
        logger.error('로그 파일 목록 API 오류:', error);
        res.status(500).json({ error: '로그 파일 목록을 불러오는데 실패했습니다.' });
    }
}
// API: 특정 로그 파일 내용 읽기
export async function getLogContent(req, res) {
    try {
        const filename = req.params.filename;
        
        // 보안을 위해 파일명 검증
        if (!filename.endsWith('.log') || filename.includes('..')) {
            logger.warn(`잘못된 로그 파일 접근 시도: ${filename}`);
            return res.status(400).json({ error: '잘못된 파일명입니다.' });
        }
            const logPath = path.join(process.env.LOG_DIR, filename);
        
    // 파일 존재 여부 확인
    try {
        await fs.access(logPath);
    } catch {
        logger.warn(`존재하지 않는 로그 파일 접근: ${filename}`);
        return res.status(404).json({ error: '파일을 찾을 수 없습니다.' });
    }
        const logContent = await fs.readFile(logPath, 'utf8');
        res.send(logContent);
    } catch (error) {
        logger.error('로그 파일 읽기 오류:', error);
        res.status(500).json({ error: '로그 파일을 읽는데 실패했습니다.' });
    }
}