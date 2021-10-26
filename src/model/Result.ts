export interface SuccessResult {
  error?: never;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface WithDataResult<T = any> {
  data: T;
}
export interface FailedResult {
  data?: never;
  message?: string;
  error: Error;
}
export type Result<T> = (SuccessResult & WithDataResult<T>) | FailedResult;
