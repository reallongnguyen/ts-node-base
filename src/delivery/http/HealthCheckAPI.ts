import { config } from '../../config';
import PlugServer, { Request, Response } from '../../PlugServer';

class HealthCheckAPI {
  connect(server: PlugServer): void {
    server.get('/', this.healthCheck);
    server.get('/healthz', this.healthCheck);
  }

  async healthCheck(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: "I'm fine",
      version: config.version,
    });
  }
}

export default HealthCheckAPI;
