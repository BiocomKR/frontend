import express from 'express';
import expressSanitizer from 'express-sanitizer';
import morgan from 'morgan';
import path from 'path'; 
import { fileURLToPath } from 'url'
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandlers.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import { logger } from './config/winston.js';

dotenv.config(); // 환경 변수 로드

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(morgan('combined', {
  stream: {
    write : (message) =>{
      logger.info(message.trim());
    }
  },
})); // 요청 로깅

app.use(helmet());
// app.use(cors({origin: 'https://biocom.kr',}))
// 추후 cors 막기
app.use(cors({
  origin: '*', // 모든 도메인에서 접근 허용
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 204, // OPTIONS 요청에 대한 성공 상태 코드
  exposedHeaders: 'Content-Type'
}));

app.use(express.json({
  contentSecurityPolicy: {
      directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "script-src": ["'self'"],
          "style-src": ["'self'", "'unsafe-inline'"],
      },
  },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());

app.use(session({
  secret: 'biocom_dev_report_page',
  resave: false,
  saveUninitialized: true
}));

app.use("/", express.static("public"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

app.use(notFoundHandler);
app.use(errorHandler);

logger.info('Express application configured successfully');

export default app;
