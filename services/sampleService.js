/**
 * author : 지수
 * des    : 서비스 작성 시 sql 조회 코드 sample로 활용해주시면 감사하겠습니다.
 */
import { logger } from '../../config/winston.js';
import * as SqlService from '../SqlService.js';
// sql import 하여 사용하세요!

// 전체 데이터 조회 서비스
async function getAllData() {
    try{
        const query = `select 쿼리 아이디 삽입!`
        SqlService.queryLogging(query, params);
        return await SqlService.selectList(query); // 파라미터가 없을 경우 빈 배열을 전달
    }catch (error){
        logger.error(`Error in getUGIReportData: ${error.message}`);
        throw error;
    }
    
}

// 특정 데이터 조회 서비스 (파라미터 바인딩)
async function getDataById(param) {
    try{
        const query = `select 쿼리 아이디 삽입!`;
        // ex)
        const params = [
            { name: 'id', type: SqlService.sql.Int, value: param }
        ];
        SqlService.queryLogging(query, params);
    
        return await SqlService.selectData(query, params);
    }catch (error) {
        logger.error(`Error in getUGIReportData: ${error.message}`);
        throw error;
    }
}

// 데이터 삽입 서비스
async function insertNewData(param) {
    try{
        const query = `insert 쿼리 아이디 삽입!`;
        // ex)
        const params = [
            { name: 'value1', type: sql.VarChar, value: param.value1 },
            { name: 'value2', type: sql.VarChar, value: param.value2 }
        ];
        SqlService.queryLogging(query, params);
        return await SqlService.insertData(query, params);
    }catch (error) {
        logger.error(`Error in getUGIReportData: ${error.message}`);
        throw error;
    }
}

// 데이터 갱신 서비스
async function updateExistingData(param) {
    try{
        const query = `update 쿼리 아이디 삽입!`;
        // ex)
        const params = [
            { name: 'id', type: sql.Int, value: param.id },
            { name: 'newValue', type: sql.VarChar, value: param.newValue }
        ];
        SqlService.queryLogging(query, params);
        
        return await SqlService.updateData(query, params);
    }catch (error) {
        logger.error(`Error in getUGIReportData: ${error.message}`);
        throw error;
    }
}

async function transferMoney(param) {
    // 순서가 필요한 부분에서 사용하세요~
    await SqlService.executeTransaction(async (transaction) => {
        // 출금 계좌에서 금액 차감
        await transaction.request()
        .input('amount', SqlService.sql.Money, param.amount)
        .input('accountId', SqlService.sql.Int, param.fromAccount)
        .query('쿼리ID 1');

        // 입금 계좌에 금액 추가
        await transaction.request()
        .input('amount', SqlService.sql.Money, param.amount)
        .input('accountId', SqlService.sql.Int, param.toAccount)
        .query('쿼리ID 2');

        // 거래 기록 생성
        await transaction.request()
        .input('fromAccount', SqlService.sql.Int, param.fromAccount)
        .input('toAccount', SqlService.sql.Int, param.toAccount)
        .input('amount', SqlService.sql.Money, param.amount)
        .query('쿼리ID 3');
    });
}

export {getAllData, getDataById, insertNewData, updateExistingData, transferMoney};