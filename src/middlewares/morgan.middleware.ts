import morgan, { StreamOptions } from 'morgan';
import logger from '../utils/logger';

const stream: StreamOptions = {
  write: (message: string) => logger.http(message),
};

const skip = () => (process.env.NODE_ENV || 'development') !== 'development';

const morganMiddleware = morgan('tiny', { stream, skip });
export default morganMiddleware;
