import sql from 'mssql';
import { config } from './dbConfig.js'
import { logger } from './winston.js'

// 최대 재시도 횟수
const MAX_RETRIES = 3;
// 재시도 간 대기 시간 (밀리초)
const RETRY_DELAY = 50000; // 5초

/**
 * DB 연결 풀을 생성하는 함수
 */
const createPool = async (retries = 0) => {
  try {
      logger.info('try DB Connect...');
      logger.info(`SERVER: ${config.dbconfig.server}, DATABASE: ${config.dbconfig.database}`);
      
      const pool = await new sql.ConnectionPool(config.dbconfig).connect();
      
      pool.on('error', err => {
          logger.error('DB Pool Err:', err);
      });

      logger.info('🦫 Create DB Connection Pool Complete!');
      return pool;
  } catch (err) {
      logger.error(`DB Connect Fail: ${err.message}`);
      logger.error(`에러 코드: ${err.code}, 상태: ${err.state}`);
      
      if (retries < MAX_RETRIES) {
          logger.info(`${RETRY_DELAY / 1000}초 후 재시도... (${retries + 1}/${MAX_RETRIES})`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          return createPool(retries + 1);
      }
      
      throw new Error(`DB 연결 실패 (최대 재시도 횟수 초과): ${err.message}`);
  }
};

// DB 연결 풀 생성 시도
const poolPromise = createPool().catch(err => {
  logger.error('최대 재시도 횟수 초과 후 DB 연결 풀 생성 실패');
  // 연결 실패 시 프로세스 종료
  process.exit(1);
});

// 애플리케이션 종료 시 연결 풀 닫기
process.on('SIGINT', async () => {
  try {
    // 연결 풀 가져오기
    const pool = await poolPromise;
    // 연결 풀 닫기
    await pool.close();
    logger.info('Success Shutdown of the DB Connection Pool');
    // 프로세스 정상 종료
    process.exit(0);
  } catch (err) {
    logger.error('Error terminating DB Connection Pool:', err);
    // 오류 발생 시 비정상 종료
    process.exit(1);
  }
});

// 테스트 커넥션
const testConnection = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT 1 as test');
        logger.info('DB connect test complete!!!');
        return result;
    } catch (err) {
        logger.error('DB 연결 테스트 실패:', err);
        throw err;
    }
};

// sql 객체와 poolPromise 내보내기
export {
  sql, poolPromise, testConnection
}