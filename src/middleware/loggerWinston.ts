import winston from "winston";
import { format as dateFormat } from 'date-fns';


const logLevels = {
    trace: 0,
    info: 1,
    warn: 2,
    error: 3,
    debug: 4,
    fatal: 5,
  };

const logger = winston.createLogger({
    levels: logLevels,
    level: 'info',
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp({ format: () => dateFormat(new Date(), "dd/MM/yyyy HH:mm:ss") }),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${level}  Message : ${message}   date : ${timestamp}`;
        })
      ),
      transports: [
        new (winston.transports.File)({
          filename: './src/logs/filelog-info.log',
          level: 'info'
        }),
        new (winston.transports.File)({
          filename: './src/logs/filelog-error.log',
          level: 'error'
        })
      ]
    
})

export default logger