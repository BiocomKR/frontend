import ServiceLogger from '../../config/ServiceLogger.js';
import * as SqlService from '../SqlService.js';
import * as UGIReportSql from '../../sql/reports/UGIReportSql.js'

const logger = new ServiceLogger('UGIReportService');

async function getUGIReportData(param) {
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

export { getUGIReportData as getAllData };