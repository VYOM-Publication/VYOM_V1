import mongoose from 'mongoose';
import { config } from './index';
import { logger } from '../shared/utils/logger';

/**
 * Tracks whether we successfully connected.
 * Routes that require the database check this and return 503 in development
 * when MongoDB is not available, rather than crashing the process.
 */
export let isDatabaseConnected = false;

export async function connectDatabase(): Promise<void> {
  mongoose.connection.on('connected', () => {
    isDatabaseConnected = true;
    logger.info('MongoDB connected');
  });
  mongoose.connection.on('error', (err) => logger.error('MongoDB error', { err }));
  mongoose.connection.on('disconnected', () => {
    isDatabaseConnected = false;
    logger.warn('MongoDB disconnected');
  });

  try {
    await mongoose.connect(config.db.mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  } catch (err) {
    if (config.isProduction) {
      // Production must not start without a database — re-throw so the
      // bootstrap function calls process.exit(1).
      throw err;
    }

    // Development: log clearly and continue. DB-dependent routes will fail
    // with a clear 503 rather than taking the whole process down.
    logger.warn(
      '⚠  MongoDB is not reachable. The API server will start without a ' +
      'database connection. All routes that touch the database will return ' +
      '503 until MongoDB becomes available. Start MongoDB or set MONGODB_URI ' +
      'in apps/api/.env to resolve this.',
      { uri: config.db.mongoUri },
    );
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  isDatabaseConnected = false;
  logger.info('MongoDB disconnected');
}
