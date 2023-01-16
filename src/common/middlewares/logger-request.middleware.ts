import {
  Injectable,
  Logger,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  logger: LoggerService;
  constructor() {
    this.logger = new Logger(RequestLoggerMiddleware.name);
  }
  use(
    req: Request & { originalUrl: string },
    res: Response,
    next: NextFunction,
  ) {
    this.logger.log(`[${req.method}]: ${req.originalUrl}`);
    next();
  }
}
