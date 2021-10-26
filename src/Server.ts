import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';

import PlugServer, { VerbFunc } from './PlugServer';
import { httpLogger } from './usecase/logger';

export interface ServerConfig {
  port: number;
}

class Server implements PlugServer {
  app: express.Express;

  constructor() {
    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(httpLogger);
  }

  start(config: ServerConfig): Promise<void> {
    return new Promise((resolve) => {
      const server = http.createServer(this.app);
      server.listen(config.port, resolve);
    });
  }

  handleError(): void {
    const notFoundErrorHandler = (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.status(404).json({
        success: false,
        message: 'NOT_FOUND',
      });

      next();
    };

    this.app.use('*', notFoundErrorHandler);
  }

  use: VerbFunc = (...params) => {
    this.app.use(...params);
  };
  get: VerbFunc = (...params) => {
    this.app.get(...params);
  };
  post: VerbFunc = (...params) => {
    this.app.post(...params);
  };
  patch: VerbFunc = (...params) => {
    this.app.patch(...params);
  };
  delete: VerbFunc = (...params) => {
    this.app.delete(...params);
  };
}

export default Server;
