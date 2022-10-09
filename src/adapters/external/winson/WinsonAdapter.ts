import { IAppLogger } from "../../../usecases/service/interfaces/IAppLogger";

const winston = require("winston");

export class WinsonLoggerAdapter implements IAppLogger {
  private static INSTANCE: WinsonLoggerAdapter;

  private logger: any;

  public constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      defaultMeta: { service: "gateway server" },
      transports: [
        new winston.transports.File({
          filename: "./logs/error.log",
          level: "error",
        }),
        new winston.transports.File({ filename: "./logs/combined.log" }),
      ],
    });
  }

  public static getInstance(): WinsonLoggerAdapter {
    if (!WinsonLoggerAdapter.INSTANCE) {
      WinsonLoggerAdapter.INSTANCE = new WinsonLoggerAdapter();
    }
    return WinsonLoggerAdapter.INSTANCE;
  }

  showLog(type: string, message: string): void {
    if (this.logger) {
      this.logger.log({
        level: type,
        message,
      });
    } else {
      console.log(`[${type}]: ${message}`);
    }
  }
}
