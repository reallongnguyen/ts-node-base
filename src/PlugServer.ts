import { Request, Response, Handler, NextFunction } from 'express';

export type VerbFunc = (path: string, ...middleware: Handler[]) => void;

interface PlugServer {
  get: VerbFunc;
  post: VerbFunc;
  patch: VerbFunc;
  delete: VerbFunc;
  use?: VerbFunc;
}

export default PlugServer;

export { Request, Response, Handler, NextFunction };
