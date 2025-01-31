import ServiceLogger from '../../config/ServiceLogger.js';
import * as SqlService from '../SqlService.js';
import * as IgGReportSql from '../../sql/reports/IgGReportSql.js'

const logger = new ServiceLogger('IgGReportService');

export async function getAllData(param) {
    try {
        logger.info(`[UGI Report] 조회 시작 - 사용자: ${param}`);
        
        const query = IgGReportSql.selectIgGquery;
        const params = [
            { name: 'name', type: SqlService.sql.NVarChar(50), value: param }
        ];

        SqlService.queryLogging(query, params);
        const res = await SqlService.selectData(query, params);

        logger.info('조회 완료', { res });
        return res;
    } catch (error) {
        logger.error(`Error in getUGIReportData: ${error.message}`);
        throw error;
    }
}

export async function getLevels(){
    try{
        const query = IgGReportSql.selectLevels;
        const params = [];

        SqlService.queryLogging(query, params);
        const res = await SqlService.selectData(query, params);

        logger.info('조회 완료', { res });
        return res;
    }
    catch(error){
        logger.error(`Error in getLevels: ${error.message}`);
        throw error;
    }
}


export async function insertLevels(param){
    try{
        const query = IgGReportSql.insertLevels;
        const params = [
            { name: 'level1', type: SqlService.sql.Float, value: param.level1 },
            { name: 'level2', type: SqlService.sql.Float, value: param.level2 },
            { name: 'level3', type: SqlService.sql.Float, value: param.level3 },
            { name: 'level4', type: SqlService.sql.Float, value: param.level4 },
            { name: 'level5', type: SqlService.sql.Float, value: param.level5 },
            { name: 'rgstUser', type: SqlService.sql.NVarChar(50), value: param.rgstUser }
        ];


        SqlService.queryLogging(query, params);
        await SqlService.insertData(query, params);
        
        logger.info('====================================================')
        logger.info('지연성알러지 참고치 데이터 등록 완료['+param.rgstUser+']');
        logger.info('====================================================')
        return true;
    }
    catch(error){
        logger.error(`Error in insertLevels: ${error.message}`);
        throw error;
    }
}