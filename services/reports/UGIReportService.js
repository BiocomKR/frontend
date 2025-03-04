import ServiceLogger from '../../config/ServiceLogger.js';
import * as SqlService from '../SqlService.js';
import * as UGIReportSql from '../../sql/reports/UGIReportSql.js'

const logger = new ServiceLogger('UGIReportService');

export async function getAllData(param) {
    try {
        logger.info(`[UGI Report] 조회 시작 - 사용자: ${param}`);
        
        const query = UGIReportSql.selectUGIquery;
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

export async function getSuppleList(param) {
    try {
        logger.info(`[UGI Report] ${param} 영양제 리스트 조회!`);
        
        const query = UGIReportSql.selectSupplementquery;
        const params = [
            { name: 'supple', type: SqlService.sql.NVarChar(400), value: param }
        ];

        SqlService.queryLogging(query, params);
        const res = await SqlService.selectList(query, params);
    
        logger.info('조회 완료', { res });
        return res;
    } catch (error) {
        logger.error(`Error in getAllList: ${error.message}`);
        throw error;
    }
}

export async function getUgiIdByDate(param) {
    try{
        logger.info(`[UGI Report] ${param} 날짜 기반 검사 id 조회!`);

        const query = UGIReportSql.selectUgiIdByDate;
        const params = [
            { name: 'date', type: SqlService.sql.Date, value: param }
        ];

        SqlService.queryLogging(query, params);
        const res = await SqlService.selectList(query, params);
        return res;
    }catch(error){

    }
}