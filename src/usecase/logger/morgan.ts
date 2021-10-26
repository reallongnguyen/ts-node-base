import * as morgan from 'morgan';
import { Logger } from 'winston';
import { RequestHandler } from 'express';

const createHTTPLogger = (logger: Logger): RequestHandler => {
  morgan.format('format', '":method :url" :status :res[content-length] - :response-time ms');

  return morgan('format', {
    stream: {
      write: (message: string): Logger => logger.info(message.trim()),
    },
  });
}

export default createHTTPLogger;
