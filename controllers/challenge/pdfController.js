import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//음과검 결과지
export const getFoodReport = async (req, res) => {
    console.log('getFoodReport');
    const filename = req.params.filename;
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '..', 'public', 'pdf', 'food_report');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인
    if (fs.existsSync(pdfPath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + encodeURIComponent(filename) + '"');
        res.sendFile(pdfPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending the file');
            }
        });
    } else {
        res.status(404).send('PDF 파일을 찾을 수 없습니다.');
    }
}

// 음과검 솔루션
export const getFoodSolution = async (req, res) => {
    const filename = 'food.pdf';
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '..', 'public', 'pdf','food_solution');
    const pdfPath = path.join(baseDir, filename);
    console.log('getFoodSolution');
    console.log(baseDir);
    console.log(pdfPath);
    if (fs.existsSync(pdfPath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + encodeURIComponent(filename) + '"');
        res.sendFile(pdfPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending the file');
            }
        });
    } else {
        res.status(404).send('PDF 파일을 찾을 수 없습니다.');
    }
}

// 종호 결과지
export const getHormoneReport = async (req, res) => {
    const filename = req.params.filename;
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '..', 'public', 'pdf', 'hormone_report');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인
    if (fs.existsSync(pdfPath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + encodeURIComponent(filename) + '"');
        res.sendFile(pdfPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending the file');
            }
        });
    } else {
        res.status(404).send('PDF 파일을 찾을 수 없습니다.');
    }
}

// 종호 솔루션
export const getHormoneSolution = async (req, res) => {
    const filename = req.params.filename;
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '..', 'public', 'pdf', 'hormone_solution');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인
    if (fs.existsSync(pdfPath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + encodeURIComponent(filename) + '"');
        res.sendFile(pdfPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending the file');
            }
        });
    } else {
        res.status(404).send('PDF 파일을 찾을 수 없습니다.');
    }
}

// 종대 결과지
export const getUgiReport = async (req, res) => {
    const filename = req.params.filename;
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '..', 'public', 'pdf', 'ugi_report');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인
    if (fs.existsSync(pdfPath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + encodeURIComponent(filename) + '"');
        res.sendFile(pdfPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending the file');
            }
        });
    } else {
        res.status(404).send('PDF 파일을 찾을 수 없습니다.');
    }
}

// 종대 솔루션
export const getUgiSolution = async (req, res) => {
    const filename = req.params.filename;
    if (!filename.endsWith('.pdf')) return res.status(400).send('Invalid file type');
    const baseDir = path.join(__dirname, '..', 'public', 'pdf', 'ugi_solution');
    const pdfPath = path.join(baseDir, filename);
    // 파일 존재 여부 확인
    if (fs.existsSync(pdfPath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + encodeURIComponent(filename) + '"');
        res.sendFile(pdfPath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending the file');
            }
        });
    } else {
        res.status(404).send('PDF 파일을 찾을 수 없습니다.');
    }
}