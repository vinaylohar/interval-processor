import express from 'express';
import cors from 'cors';
import intervalRoutes from './routes/interval-routes.js';
import { config } from './config.js';
import swaggerUi from 'swagger-ui-express';
import { openapiSpec } from './docs/openapi.js';

export function createServer(): express.Application {
  const app = express();

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec, { explorer: true }));

  // CORS using config.allowedOrigins
  const originWhitelist = new Set(config.allowedOrigins);
  const corsOptions: cors.CorsOptions = {
    origin(origin, callback) {
      if (!origin || originWhitelist.has('*') || originWhitelist.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    optionsSuccessStatus: 204
  };
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

  // Request parsing with size limits
  app.use(express.json({
    limit: config.requestSizeLimit,
    strict: true
  }));

  // Simple request logging
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Routes
  app.use('/api', intervalRoutes);


  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.method} ${req.originalUrl} not found`
    });
  });

  // Error handler
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: config.isDevelopment ? err.message : 'Something went wrong'
    });
  });

  return app;
}

/**
 * Starts the server
 */
export function startServer(): void {
  const app = createServer();
  const port = config.port;

  const server = app.listen(port, () => {
    console.log(`Server started:  http://localhost:${port}`);
    console.log(`Documentation: http://localhost:${port}/api-docs`);
    console.log(`Health check: http://localhost:${port}/api/health`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => process.exit(0));
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => process.exit(0));
  });
}