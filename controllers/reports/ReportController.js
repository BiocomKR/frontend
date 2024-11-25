import { logger } from '../../config/winston.js';
import * as service from '../../services/reports/UGIReportService.js'

// get mapping = reportInfo
export function getInsertInfo(req, res){
    try{
        res.render('reports/Reportinfo');

    }catch(error){
        res.status(500).json({ error: error.message });
        logger.error(error)
        console.log(error)
    }
}

// 리포트 올 리스트
export async function getUgiList(req, res){
    try{
        const result = await service.getAllList();
        // 추후 다른 검사들도 할수 있게, param 받아서 , 쿼리 테이블명 동적 생성..
        if (!result) return res.status(404).json({ error: '데이터를 찾을 수 없습니다.' });
        
        res.json({
            results: [result],
        });
    }
    catch(error){
        res.status(500).json({ error: error.message }); 
        logger.error(error);
        console.log(error)
    }
}