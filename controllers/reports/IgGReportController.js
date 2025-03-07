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
            isAuthenticated: true ,
            reportID: ''
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
// get mapping = report/igg
export async function getIgGApi(req, res) {
    try{
        const {id, reportID} = req.query;
        if(!id) return res.status(400).json({error:'사용자 이름이 없습니다.'});

        // 세션에 username 저장
        req.session.username = id;

        return res.render(`reports/IgGReportView`,{
            username : id,
            reportID,
            isAuthenticated: true 
        });
    }catch(error){
        logger.error(`Error in getIgGApi: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}
// get mapping = api/ugiIdByDate
export async function getIgGIdByDate(req, res) {
    try{
        const {date} = req.query;
        if(!date) return res.status(400).json({error:'전달된 날짜가가 없습니다.'});
        let dateString;
        // 날짜 형식은 250304 또는 2025-04-06, 2025/04/06 등으로 전달되야만 함.
        if(date.length <=8){
            if(/^\d{6}$/.test(date)){
                const year = parseInt(date.substring(0, 2), 10) + 2000;
                const month = date.substring(2, 4);
                const day = date.substring(4, 6);
                dateString = `${year}-${month}-${day}`;
            }else if(/^\d{8}$/.test(date)){
                const year = parseInt(date.substring(0, 4), 10);
                const month = date.substring(4, 6);
                const day = date.substring(6, 8);
                dateString = `${year}-${month}-${day}`;
            }
        }else {
            const dt = new Date(date);
            const year = dt.getFullYear();
            const month = (dt.getMonth() + 1).toString().padStart(2, '0');
            const day = dt.getDate().toString().padStart(2, '0');
            dateString = `${year}-${month}-${day}`;
        }
        
        if(isNaN(new Date(dateString))) return res.status(400).json({error:'유효하지 않은 날짜입니다.'});

        const result = await service.getIgGIdByDate(dateString);

        if (!result) return res.status(400).json({ error: '유효하지 않은 코드 입니다.' });
        const results = result.map(item =>{return {id: item.userId, name: item.userName}});
        
        res.json({
            results,
        });
    } catch(error){
        logger.error(`Error in getReportData: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}