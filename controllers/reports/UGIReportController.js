import { logger } from '../../config/winston.js';
import * as service from '../../services/reports/UGIReportService.js'

// post mapping = report/UGI 
export function getUserCheck(req, res){
    try{
        const { username } = req.body;
        
        // 세션에 username 저장
        req.session.username = username;
        return res.render(`reports/UGIReportView`,{
            username : username,
            isAuthenticated: true 
        });
        
    }catch (error){
        res.status(500).json({ error: error.message });
        logger.error(error)
        console.log(error)
    }
}
// get mapping = report/UGIReport
export async function getReportData(req, res){
    try{
        const {username} = req.query;
        if(!username) return res.status(400).json({error:'사용자 이름이 없습니다.'});
        
        const result = await service.getAllData(username);

        if (!result) return res.status(404).json({ error: '데이터를 찾을 수 없습니다.' });

        res.json({
            username: username,
            testDate: new Date().toISOString(),
            results: [result],
        });
    } catch(error){
        logger.error(`Error in getReportData: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}
