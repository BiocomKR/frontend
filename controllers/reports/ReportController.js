import { logger } from '../../config/winston.js';
import * as service from '../../services/reports/reportService.js'

const pageRow = 30; // pagenation 한 페이지마다 보여줄 데이터 row 수

// get mapping = reportInfo
export function getInsertInfo(req, res){
    try{
        res.render('reports/Reportinfo',{
            'analysis' : req.query.analysis || 'UGI'
        });

    }catch(error){
        res.status(500).json({ error: error.message });
        logger.error(error)
        console.log(error)
    }
}

// 종합대사기능검사 리포트 리스트
export async function getUgiList(req, res){
    try{
        const {date, pageNo} = req.query;
        const {result, totalPage} = await service.getAllUGIList({date, pageNo, pageRow});
        // 추후 다른 검사들도 할수 있게, param 받아서 , 쿼리 테이블명 동적 생성..
        if (!result) return res.status(404).json({ error: '데이터를 찾을 수 없습니다.' });
        
        res.json({
            results: result,
            totalPage: totalPage
        });
    }
    catch(error){
        res.status(500).json({ error: error.message }); 
        logger.error(error);
        console.log(error)
    }
}

// 지연성알러지검사 리포트 리스트
export async function getIgGList(req, res){
    try{
        const {date, pageNo} = req.query;
        const {result, totalPage} = await service.getAllIgGList({date, pageNo, pageRow});
        // 추후 다른 검사들도 할수 있게, param 받아서 , 쿼리 테이블명 동적 생성..
        if (!result) return res.status(404).json({ error: '데이터를 찾을 수 없습니다.' });
        
        res.json({
            results: result,
            totalPage: totalPage
        });
    }
    catch(error){
        res.status(500).json({ error: error.message }); 
        logger.error(error);
        console.log(error)
    }
}