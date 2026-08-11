import { app } from './app';
import { config } from './config';
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import { logger } from './shared/utils/logger';

async function bootstrap(): Promise<void> {
  try {
    await connectDatabase();
    await connectRedis();

    const server = app.listen(config.server.port, () => {
      logger.info(`VYOM API running`, {
        port: config.server.port,
        env: config.env,
        version: config.server.apiVersion,
      });
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      logger.info(`${signal} received — shutting down gracefully`);
      server.close(async () => {
        const { disconnectDatabase } = await import('./config/database');
        const { disconnectRedis } = await import('./config/redis');
        await disconnectDatabase();
        await disconnectRedis();
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    logger.error('Failed to start server', { err });
    process.exit(1);
  }
}

bootstrap();
