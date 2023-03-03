import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

interface ErrorResponse {
  status: string;
  message: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const errorResponse: ErrorResponse = {
      status: 'error',
      message: exception.message,
    };
    response.status(statusCode).json(errorResponse);
  }
}
