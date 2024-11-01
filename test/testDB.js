import sql from 'mssql';
import { logger } from '../config/winston.js';

const config = {
    server: 'sib.codns.com',
    port: 4955,
    database: 'LabSpearSIB',
    user: 'biocom',
    password: 'bico0519!!', // 실제 비밀번호 입력
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        requestTimeout: 30000
    }
};

async function testConnection() {
    try {
        logger.info('DB 연결 테스트 시작...');
        const pool = await new sql.ConnectionPool(config).connect();
        
        const result = await pool.request().query('SELECT GETDATE() as serverTime');
        logger.info(`DB 연결 성공! 서버 시간: ${result.recordset[0].serverTime}`);
        
        await pool.close();
        logger.info('DB 연결 종료');
        
        return true;
    } catch (error) {
        logger.error('DB 연결 테스트 실패:', error);
        return false;
    }
}

// 테스트 실행
testConnection().then(success => {
    process.exit(success ? 0 : 1);
});