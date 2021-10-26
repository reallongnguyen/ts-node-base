import * as winston from 'winston';
import * as moment from 'moment-timezone';

const { combine, printf } = winston.format;

interface WinstonConfig {
  serviceName: string;
  nodeENV: string;
  logLevel: string;
  timeZone?: string;
}

const createLogger = (config: WinstonConfig): winston.Logger => {
  const { serviceName, nodeENV, timeZone } = config;
  let format;

  if (nodeENV === 'development') {
    const simpleFormat = printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);
    const appendTimestamp = winston.format((info, opts) => ({
      ...info,
      timestamp: moment().tz(opts.tz).format(),
    }));

    const formatWithTimeStamp = combine(
      appendTimestamp({ tz: timeZone || 'Asia/Tokyo' }),
      simpleFormat,
    );

    format = formatWithTimeStamp;
  } else {
    // In case of not being dev, need no timestamp
    const formatWithNoTimeStamp = printf((info) => `${info.level}: ${serviceName}: ${info.message}`);
    format = formatWithNoTimeStamp;
  }

  return winston.createLogger({
    levels: winston.config.syslog.levels,
    level: config.logLevel,
    format,
    transports: [
      new winston.transports.Console({ format }),
    ],
  });
};

export default createLogger;
