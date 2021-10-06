import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

import { ErrorCode } from '@shared/models';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002':
        this.catchUniqueConstraint(exception, response);
        break;
      default:
        this.unhandledException(exception, host);
        break;
    }
  }

  private catchUniqueConstraint(
    exception: Prisma.PrismaClientKnownRequestError,
    response: Response
  ) {
    response.status(HttpStatus.CONFLICT).json({
      errorCode: ErrorCode.ENTITY_ALREADY_EXIST,
      message: this.cleanUpException(exception),
    });
  }

  private cleanUpException(
    exception: Prisma.PrismaClientKnownRequestError
  ): string {
    return exception.message.replace(/\n/g, '');
  }

  private unhandledException(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost
  ) {
    super.catch(exception, host); // 500 error code by default
  }
}
