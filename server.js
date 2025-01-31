import https from 'https';
import fs from 'fs';
import app from './app.js';
import { logger } from './config/winston.js';
import { testConnection } from './config/dbConn.js';

async function startServer() {
    try {
        logger.info('Starting server initialization...');
        
        // SSL 옵션 로드
        let sslOptions;
        try {
            sslOptions = {
                key: fs.readFileSync('./biocom.digital/private.key'),
                cert: fs.readFileSync('./biocom.digital/certificate.crt'),
                ca: fs.readFileSync('./biocom.digital/ca_bundle.crt'),
            };
            logger.info('SSL certificates loaded successfully');
        } catch (error) {
            logger.error('SSL 인증서 로드 실패:', error);
            throw new Error('SSL 인증서 로드 실패');
        }

        // DB 연결 테스트
        try {
            await testConnection();
            logger.info('Database connection test successful');
        } catch (error) {
            logger.error('DB 연결 테스트 실패:', error);
            throw new Error('DB 연결 테스트 실패');
        }

        // HTTPS 서버 생성 및 시작
        const server = https.createServer(sslOptions, app);
        
        server.listen(3001, () => {
            logger.info('=================================================');
            logger.info('🚀 HTTPS Server successfully started');
            logger.info(`🌐 Server running on https://localhost:3001`);
            logger.info('=================================================');
        });

        // 서버 에러 이벤트 핸들링
        server.on('error', (err) => {
            logger.error('Server error occurred:', err);
            // 서버 에러 발생 시 즉시 종료하지 않고 로깅만 수행
            logger.error('Critical server error, but keeping server running');
        });

        return server; // 서버 인스턴스 반환

    } catch (error) {
        logger.error('Fatal error during server startup:', error);
        throw error; // 에러를 상위로 전파
    }
}

// 서버 시작
(async () => {
    try {
        const server = await startServer();
        logger.info('Server startup complete');

        // 정상적인 종료 처리
        process.on('SIGTERM', () => {
            logger.info('SIGTERM received. Performing graceful shutdown...');
            server.close(() => {
                logger.info('Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        logger.error('Failed to start server:', error);
        // 일정 시간 후에 프로세스 종료 (로그가 저장될 시간 확보)
        setTimeout(() => {
            process.exit(1);
        }, 10000);
    }
})();

// 예상치 못한 에러 처리
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    // 즉시 종료하지 않고 로그를 먼저 저장
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // 즉시 종료하지 않고 로그를 먼저 저장
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});

// 프로세스 종료 시 정리 작업
process.on('exit', (code) => {
    logger.info(`Process exit with code: ${code}`);
});