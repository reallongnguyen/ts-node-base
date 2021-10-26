import { config } from './config';
import Server from './Server';
import { logger } from './usecase/logger';

import HealthCheckAPI from './delivery/http/HealthCheckAPI';

async function main(): Promise<Server> {
  logger.info(`start @${config.serviceName}`);

  logger.info(`start server on port ${config.server.port}`);
  const server = new Server();
  await server.start(config.server);

  const healthCheckAPI = new HealthCheckAPI();
  healthCheckAPI.connect(server);

  return server;
}

function handlerServerCreated(server: Server): void {
  server.handleError();
  logger.debug(`config: ${JSON.stringify(config)}`);
}

main().then(handlerServerCreated);

process.on('SIGINT', async () => {
  logger.info(`exit @${config.serviceName}`);
  process.exit(0);
});
