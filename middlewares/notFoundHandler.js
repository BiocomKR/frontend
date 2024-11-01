import { logger } from "../config/winston.js";
export function notFoundHandler(req, res, next) {
    logger.error(req);
    console.log('404 err')
    res.status(404).json({
      message: `Not Found - ${req.originalUrl}`,
      status: 404,
    });
  }
  