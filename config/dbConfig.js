import dotenv from 'dotenv';

dotenv.config();

// 환경변수 유효성 검사
const requiredEnvVars = [
    'DB_SERVER',
    'DB_PORT',
    'DB_DATABASE',
    'DB_USER',
    'DB_PASSWORD'
];

requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        throw new Error(`필수 환경변수 ${varName}가 설정되지 않았습니다.`);
    }
});

export const config = {
    port: process.env.PORT || 3001,
    dbconfig: {
        server: process.env.DB_SERVER,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_DATABASE, 
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, 
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            // Azure를 사용하는 경우 true로 설정
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
            requestTimeout: 30000
        }
    }
};

// 설정값 로깅 (비밀번호 제외)
console.log('Database Configuration:', {
    ...config.dbconfig,
    password: '********'
});