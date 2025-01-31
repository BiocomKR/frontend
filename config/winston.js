import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

const { combine, timestamp, label, printf } = winston.format;

//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const logDir = process.env.LOG_DIR;

//* log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
   return `${timestamp} [${label}] ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});

const logFileOptions = {
    encoding: 'utf8',
    flags: 'a',
    mode: 0o644,
    createSymlink: true,
    symlinkName: 'current.log',
    options: { flags: 'w', encoding: 'utf8' },
    hook: (transport) => {
        if (transport.filename) {
            const stream = transport.createStream(transport.filename);
            stream.write('\ufeff');
        }
    }
};

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    format: combine(
        label({ label: 'SIB_REPORT' }), 
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat, 
    // winston.format.json(), // 이거 달면 json 형식으로 출력됨
    ),
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: process.env.MAX_FILES,  // 30일치 로그 파일 저장
            zippedArchive: true, 
            ...logFileOptions
        }),
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: process.env.MAX_FILES,  // 30일치 로그 파일 저장
            zippedArchive: true, 
            ...logFileOptions
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
            filename: `%DATE%.error.log`,
            maxFiles: process.env.MAX_FILES,
            zippedArchive: true,
            ...logFileOptions
        }),
    ],
    exceptionHandlers:[
        new winstonDaily({
            level: 'error',
            datePattern:'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles:process.env.MAX_FILES,
            zippedArchive: true,
            ...logFileOptions
        })
    ]
});

// Production 환경이 아닌 경우(dev 등) 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(
                (info) => `${info.timestamp} ${info.level}: ${info.message}`
            )
        )
    }));
}

export { logger };