import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../shared/utils/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const correlationId = uuidv4();
  req.headers['x-correlation-id'] = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);

  const start = Date.now();
  res.on('finish', () => {
    logger.info('HTTP Request', {
      correlationId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: Date.now() - start,
      userAgent: req.get('user-agent'),
      ip: req.ip,
    });
  });

  next();
}
