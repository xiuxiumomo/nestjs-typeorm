import { Injectable, LoggerService } from "@nestjs/common";
import * as winston from "winston";
import "winston-daily-rotate-file";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class WinstonLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    const transport = new winston.transports.DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    });

    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.printf((info) => {
          const timestamp = dayjs().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");
          return `${timestamp} [${info.level.toUpperCase()}] ${info.message}`;
        })
      ),
      transports: [transport, new winston.transports.Console()],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} ${trace ?? ""}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
