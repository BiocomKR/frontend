import { logger } from "../config/winston.js";

export function notFoundHandler(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  logger.error(` ${error} : at ${req.originalUrl} - method: ${req.method} from [${req.ip}] `)
  res.status(404);
  next(error);
}
  
export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  logger.error(`${err.status || 500} - method: ${err.message} - at ${req.originalUrl} - ${req.method} from [${req.ip}]`);
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
  