import { logger } from './winston.js';

class ServiceLogger {
    constructor(serviceName) {
        this.serviceName = serviceName;
    }

    info(message, data = null) {
        const logMessage = this._formatMessage('INFO', message, data);
        logger.info(logMessage);
    }

    error(message, error = null) {
        const logMessage = this._formatMessage('ERROR', message, error);
        logger.error(logMessage);
    }

    debug(message, data = null) {
        const logMessage = this._formatMessage('DEBUG', message, data);
        logger.debug(logMessage);
    }

    _formatMessage(level, message, data) {
        const timestamp = new Date().toISOString();
        const baseMessage = `[${timestamp}] [${this.serviceName}] ${message}`;
        
        if (data) {
            if (data instanceof Error) {
                return `${baseMessage} - Error: ${data.message}\nStack: ${data.stack}`;
            }
            return `${baseMessage} - Data: ${JSON.stringify(data)}`;
        }
        return baseMessage;
    }
}

export default ServiceLogger;