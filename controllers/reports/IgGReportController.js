import { logger } from '../../config/winston.js';
import * as service from '../../services/reports/IgGReportService.js'

// post mapping = report/IgG 
export function getUserCheck(req, res){
    try{
        const { username } = req.body;
        
        // 세션에 username 저장
        req.session.username = username;
        return res.render(`reports/IgGReportView`,{
            username : username,
            isAuthenticated: true 
        });
        
    }catch (error){
        res.status(500).json({ error: error.message });
        logger.error(error)
        console.log(error)
    }
}
// get mapping = report/IgGReport
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
// get mapping = report/IgGReport/levels
export async function getLevels(req, res){
    try{
        const result = await service.getLevels();
        res.json({ result });
    }
    catch(error){
        logger.error(`Error in getLevels: ${error.message}`);
        res.status(500).json({ error: error.message });

    }
}
// post mapping = report/IgGReport/insertLevels
export async function insertLevels(req, res){   
    try{
        const { level1, level2, level3, level4, level5, rgstUser } = req.body;
        await service.insertLevels({ level1, level2, level3, level4, level5, rgstUser });
        res.status(200).json({ message: '데이터 등록 완료' });
    }
    catch(error){
        logger.error(`Error in insertLevels: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}
