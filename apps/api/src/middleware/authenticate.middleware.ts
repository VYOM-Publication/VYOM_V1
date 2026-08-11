import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthTokenPayload } from '@vyom/types';
import { AuthenticationError } from '../shared/errors';

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AuthenticationError());
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, config.jwt.accessSecret) as AuthTokenPayload;
    req.user = payload;
    next();
  } catch {
    next(new AuthenticationError('Invalid or expired token'));
  }
}
