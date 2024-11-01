import { poolPromise, sql } from '../config/dbConn.js'
import { logger } from '../config/winston.js'

// 공통 쿼리 실행 함수
async function executeQuery(query, params = [], singleResult = false) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    params.forEach(param => {
      request.input(param.name, param.type, param.value);
    });

    const result = await request.query(query);
    
    if (singleResult) {
      return result.recordset[0];
    }
    return result.recordset || result.rowsAffected;
  } catch (err) {
    logger.error('MSSQL Query Error:', err);
    throw err;
  }
}

// 여러 개의 행을 조회할 때 사용하는 함수
async function selectList(query, params = []) {
  return executeQuery(query, params);
}

// 단일 행을 조회할 때 사용하는 함수
async function selectData(query, params = []) {
  return executeQuery(query, params, true);
}

// 데이터를 삽입할 때 사용하는 함수
async function insertData(query, params = []) {
  return executeQuery(query, params);
}

// 데이터를 갱신할 때 사용하는 함수
async function updateData(query, params = []) {
  return executeQuery(query, params);
}

// 트랜잭션 실행 함수
async function executeTransaction(callback) {
  const pool = await poolPromise;
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();
    const result = await callback(transaction);
    await transaction.commit();
    return result;
  } catch (err) {
    await transaction.rollback();
    logger.error('Transaction Error:', err);
    throw err;
  }
}

// 공통 쿼리 로깅
function queryLogging(query, param){
  logger.info(`[parameta] : ${JSON.stringify(param)||'[ ]'}`);
  logger.info(`[Query] : ${query}`);
  logger.debug(`[Query] : ${query}`);
}

export {
  selectList,
  selectData,
  insertData,
  updateData,
  executeTransaction,
  queryLogging,
  sql
};