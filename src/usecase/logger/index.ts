import createLogger from './winston';
import createHTTPLogger from './morgan';
import { config } from '../../config';

const { serviceName, nodeENV, logLevel } = config;
const logger = createLogger({ serviceName, nodeENV, logLevel });
const httpLogger = createHTTPLogger(logger);

export {
  createLogger,
  createHTTPLogger,
  logger,
  httpLogger,
};
