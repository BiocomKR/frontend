import ServiceLogger from '../../config/ServiceLogger.js';
import * as SqlService from '../SqlService.js';
import * as ReportSql from '../../sql/reports/reportSql.js'

const logger = new ServiceLogger('reportService');

export async function getAllUGIList(param) {
    try {
        logger.info(`[UGI Report] 전체 리스트 조회!`);
        const query = param.date ?ReportSql.selectListUGIqueryByDate : ReportSql.selectListUGIquery;
        const params = param?[
            { name: 'date', type: SqlService.sql.Date , value: param.date },
            { name: 'pageNo', type: SqlService.sql.Int , value: param.pageNo||1 },
            { name: 'pageRow', type: SqlService.sql.Int , value: param.pageRow }
        ] : [];
        logger.info(`[UGI Report] 쿼리 파라미터 조회!`, params.pageNo, params.pageRow);
        SqlService.queryLogging(query, params);
        
        const result = await SqlService.selectList(query, params);
        const totalPage = await SqlService.selectData(ReportSql.countAllUGI, params);
    
        logger.info('조회 완료', { result, totalPage });
        return {result, totalPage};
    } catch (error) {
        logger.error(`Error in getAllList: ${error.message}`);
        throw error;
    }
}

export async function getAllIgGList(param) {
    try {
        logger.info(`[IgG Report] 전체 리스트 조회!`);
        const query = param.date ?ReportSql.selectListIgGqueryByDate : ReportSql.selectListIgGquery;
        const params = param?[
            { name: 'date', type: SqlService.sql.Date , value: param.date },
            { name: 'pageNo', type: SqlService.sql.Int , value: param.pageNo||1 },
            { name: 'pageRow', type: SqlService.sql.Int , value: param.pageRow }
        ] : [];
    
        SqlService.queryLogging(query, params);
        
        const result = await SqlService.selectList(query, params);
        const totalPage = await SqlService.selectData(ReportSql.countAllIgG, params);
    
        logger.info('조회 완료', { result, totalPage } );
        return {result, totalPage};
    } catch (error) {
        logger.error(`Error in getAllList: ${error.message}`);
        throw error;
    }
}