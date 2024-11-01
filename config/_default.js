import dotenv from 'dotenv';

dotenv.config(); // 환경 변수 로드

export default {
  db: {
    driver: process.env.DB_DRIVER,
    server: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
  