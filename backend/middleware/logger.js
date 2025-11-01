const winston = require('winston');
const expressWinston = require('express-winston');

const sanitizeHeaders = (req) => {
  const headers = { ...req.headers };
  if (headers.authorization) headers.authorization = '[REDACTED]';
  if (headers.cookie) headers.cookie = '[REDACTED]';
  return headers;
};

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'logs/request.log' }),
    ...(process.env.NODE_ENV !== 'production'
      ? [new winston.transports.Console({ level: 'info', format: winston.format.colorize({ all: true }) })]
      : []),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, meta, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
    }),
  ),
  ignoreRoute: (req) => req.method === 'OPTIONS',
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}} | Status {{res.statusCode}} | {{res.responseTime}}ms',
  expressFormat: false,
  colorize: false,
  requestFilter: (req, propName) => {
    if (propName === 'headers') return sanitizeHeaders(req);
    return req[propName];
  },
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
    ...(process.env.NODE_ENV !== 'production'
      ? [new winston.transports.Console({ level: 'error', format: winston.format.colorize({ all: true }) })]
      : []),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json(),
  ),
  requestFilter: (req, propName) => {
    if (propName === 'headers') return sanitizeHeaders(req);
    return req[propName];
  },
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/combined.log' }),
    ...(process.env.NODE_ENV !== 'production'
      ? [new winston.transports.Console({ format: winston.format.colorize({ all: true }) })]
      : []),
  ],
});

module.exports = { requestLogger, errorLogger, logger };
