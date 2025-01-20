import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { logger } from '../../config/winston.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendFileIfExists = (res, pdfPath, filename) => {
    try {
        if (fs.existsSync(pdfPath)) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename="' + encodeURIComponent(filename) + '"');
            res.sendFile(pdfPath, (err) => {
                if (err) {
                    logger.error('Error sending file:', err);
                    res.status(500).send('Error sending the file');
                }
            });
        } else {
            logger.error(`PDF 파일을 찾을 수 없습니다: ${pdfPath}`); // 오류 로그 추가
            res.status(404).send('PDF 파일을 찾을 수 없습니다.');
        }
    } catch (error) {
        logger.error('서버 오류:', error); // 서버 오류 로그 추가
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

//음과검 결과지
export const getFoodReport = async (req, res) => {
    console.log('getFoodReport');
    const filename = req.params.filename;
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname,'../..', 'public', 'pdf', 'food_report');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인 및 전송
    sendFileIfExists(res, pdfPath, filename);

}

// 음과검 솔루션
export const getFoodSolution = async (req, res) => {
    const filename = 'food.pdf';
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '../..', 'public', 'pdf','food_solution');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인 및 전송
    sendFileIfExists(res, pdfPath, filename);
}

// 종호 결과지
export const getHormoneReport = async (req, res) => {
    const filename = req.params.filename;
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '../..', 'public', 'pdf', 'hormone_report');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인 및 전송
    sendFileIfExists(res, pdfPath, filename);
}

// 종호 솔루션
export const getHormoneSolution = async (req, res) => {
    const filename = req.params.filename;
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '../..', 'public', 'pdf', 'hormone_solution');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인 및 전송
    sendFileIfExists(res, pdfPath, filename);
}

// 종대 결과지
export const getUgiReport = async (req, res) => {
    const filename = req.params.filename;
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '../..', 'public', 'pdf', 'ugi_report');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인 및 전송
    sendFileIfExists(res, pdfPath, filename);
}

// 종대 솔루션
export const getUgiSolution = async (req, res) => {
    const filename = req.params.filename;
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '../..', 'public', 'pdf', 'ugi_solution');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인 및 전송
    sendFileIfExists(res, pdfPath, filename);
}

export const getChallImg = async (req, res) => {
    const filename = req.params.filename;
    if (!filename.endsWith('.png')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '../..', 'public', 'images', 'challenge');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인 및 전송
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'inline; filename="' + encodeURIComponent(filename) + '"');
    res.sendFile(pdfPath, (err) => {
        if (err) {
            console.error('Error sending image:', err);
            res.status(404).send('Image not found');
        }
    });
}
