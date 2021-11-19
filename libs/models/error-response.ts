import { ErrorCode } from '@shared/models';

export interface ErrorResponse {
  errorCode: ErrorCode;
  message: string;
}
