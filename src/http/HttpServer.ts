import path from 'node:path';

import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

import taskRoutes from './routes/tasks.ts';

export class HttpServer {
  private static instance?: HttpServer;
  private server?: HttpServer;
  private readonly app: Express;

  private constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureSwagger();
  }

  private configureMiddleware() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }

  private configureSwagger() {
    const swaggerPath = path.resolve(process.cwd(), 'openapi.yml');
    const swaggerDocument = YAML.load(swaggerPath);
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private configureRoutes() {
    this.app.use('/api/tasks', taskRoutes);
  }

  public static start(port: number) {
    if (this.instance) {
      throw new Error(`Server is already running!`);
    }
    this.instance = new HttpServer();
    this.instance.app.listen(port, () => {
      console.log(`\x1b[32m✅ Server running on http://localhost:${port}\x1b[0m`);
      console.log(`\x1b[32m📝 Documentation available on http://localhost:${port}/api/docs\x1b[0m`);
    });
  }

  private stop = () => {
    void this.server?.stop();
  };

  public static stop() {
    this.instance?.stop();
    this.instance = undefined;
  }
}
