import { Request, Response, NextFunction } from 'express';
import { isDatabaseConnected } from '../config/database';
import { config } from '../config';

/**
 * Apply this middleware to any route group that requires MongoDB.
 *
 * In production MongoDB is always required, so a missing connection is a fatal
 * startup failure and this middleware will never actually trigger.
 *
 * In development, if MongoDB is not running, routes return a clear 503 with an
 * actionable message rather than a raw Mongoose connection error.
 */
export function dbRequired(_req: Request, res: Response, next: NextFunction): void {
  if (isDatabaseConnected) {
    return next();
  }

  if (config.isProduction) {
    // Should never reach here — production startup fails fast.
    res.status(503).json({ success: false, message: 'Database unavailable.' });
    return;
  }

  res.status(503).json({
    success: false,
    message:
      'MongoDB is not connected. Start a local MongoDB instance or set ' +
      'MONGODB_URI in apps/api/.env, then restart the API server.',
  });
}
