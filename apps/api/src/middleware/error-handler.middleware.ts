import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../shared/errors';
import { logger } from '../shared/utils/logger';
import { ApiResponse } from '@vyom/types';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ValidationError) {
    const response: ApiResponse = {
      success: false,
      message: err.message,
      errors: err.fields,
    };
    res.status(err.statusCode).json(response);
    return;
  }

  if (err instanceof AppError && err.isOperational) {
    const response: ApiResponse = {
      success: false,
      message: err.message,
    };
    res.status(err.statusCode).json(response);
    return;
  }

  // Unexpected error — do not leak details to client
  logger.error('Unhandled error', { err });
  const response: ApiResponse = {
    success: false,
    message: 'An unexpected error occurred. Please try again later.',
  };
  res.status(500).json(response);
}
