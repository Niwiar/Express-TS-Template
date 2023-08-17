import winston from 'winston';

const logDir = 'logs';
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level =
  (process.env.NODE_ENV || 'development') !== 'development' ? 'warn' : 'debug';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: `${logDir}/all.log` }),
  new winston.transports.File({
    filename: `${logDir}/error.log`,
    level: 'error',
  }),
];

const logger = winston.createLogger({
  level,
  levels,
  format,
  transports,
});

export default logger;
