export enum MessageType {
  SUCCESS = 'SUCCESS',
  SERVER_ERROR = 'SERVER_ERROR',
  SMS_TEMPLATE_NOT_FOUNDED = 'SMS_TEMPLATE_NOT_FOUNDED',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  CODE_FAILED = 'CODE_FAILED',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
}

export interface UseCaseResponse<T> {
  message: MessageType;
  error?: { message: string };
  data?: T;
}
