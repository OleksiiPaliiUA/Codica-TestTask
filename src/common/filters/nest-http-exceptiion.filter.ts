import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { Response } from 'express';
import { CoreApiResponse, Code } from '../';

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  private logger: LoggerService;

  constructor() {
    this.logger = new Logger(NestHttpExceptionFilter.name);
  }

  public catch(error: any, host: ArgumentsHost): void {
    const response: Response = host.switchToHttp().getResponse<Response>();

    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error({
      code: parseInt(error.code) || Code.INTERNAL_ERROR.code,
      message: error.message,
    });

    errorResponse = this.handleException(error, errorResponse);
    response.status(errorResponse.code).send(errorResponse);
  }

  private handleException(
    error: any,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    this.logger.error(JSON.stringify(error));
    if (error.codePrefix) {
      error.code = Code.INTERNAL_ERROR.code;
    }

    if (error.status === Code.NOT_FOUND_ERROR.code) {
      return CoreApiResponse.error({
        code: Code.NOT_FOUND_ERROR.code,
        message: error.message,
      });
    }

    if (error.status === Code.UNAUTHORIZED_ERROR.code) {
      return CoreApiResponse.error({
        code: Code.UNAUTHORIZED_ERROR.code,
        message: error.message,
      });
    }

    if (error.status === Code.BAD_REQUEST_ERROR.code) {
      return CoreApiResponse.error({
        code: Code.BAD_REQUEST_ERROR.code,
        message: error.message,
        data: error.response.message,
      });
    }

    if (
      error.status === Code.CONFLICT_ERROR.code &&
      error.message === 'AlreadyExists'
    ) {
      return CoreApiResponse.error({
        code: Code.CONFLICT_ERROR.code,
        message: error.message,
      });
    }

    if (
      error.status === Code.CONFLICT_ERROR.code &&
      error.message === 'Conflict'
    ) {
      return CoreApiResponse.error({
        code: Code.CONFLICT_ERROR.code,
        message: error.message,
      });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return CoreApiResponse.error({
        code: Code.CONFLICT_ERROR.code,
        message: error.errors[0].type,
        data: error.errors[0].message,
      });
    }

    return errorResponse;
  }
}
