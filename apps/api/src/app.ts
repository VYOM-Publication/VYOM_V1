import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { globalRateLimiter } from './middleware/rate-limiter.middleware';
import { requestLogger } from './middleware/request-logger.middleware';
import { errorHandler } from './middleware/error-handler.middleware';
import { dbRequired } from './middleware/db-required.middleware';
import authRoutes from './modules/auth/auth.routes';
import rolesRoutes from './modules/roles/roles.routes';
import submissionsRoutes from './modules/submissions/submissions.routes';
import booksRoutes from './modules/books/books.routes';
import articlesRoutes from './modules/articles/articles.routes';
import paymentsRoutes from './modules/payments/payments.routes';
import profileRoutes from './modules/profile/profile.routes';
import editorialRoutes from './modules/editorial/editorial.routes';

const app = express();

// NOTE: The /uploads static serve has been intentionally removed.
// Serving manuscript files publicly without authentication is a security risk.
// Implement an authenticated GET /api/v1/files/:filename endpoint that:
//   1. Verifies the requester is authenticated (authenticate middleware)
//   2. Checks the user has access to the requested file (author, assigned reviewer, or editor)
//   3. Streams the file from local storage or generates a signed S3 URL
// TODO: Implement authenticated file download endpoint before production.

// Security headers
app.use(helmet());

// CORS — only allow configured frontend origin
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser(config.cookie.secret));

// Logging & rate limiting
app.use(requestLogger);
app.use(globalRateLimiter);

// Health check — no auth, no DB required
app.get('/health', (_req, res) => {
  const { isDatabaseConnected } = require('./config/database');
  res.json({
    status: 'ok',
    version: config.server.apiVersion,
    timestamp: new Date().toISOString(),
    services: {
      database: isDatabaseConnected ? 'connected' : 'unavailable',
    },
  });
});

// All API routes require a live database connection
const apiPrefix = `/api/${config.server.apiVersion}`;
app.use(`${apiPrefix}/auth`, dbRequired, authRoutes);
app.use(`${apiPrefix}/roles`, dbRequired, rolesRoutes);
app.use(`${apiPrefix}/submissions`, dbRequired, submissionsRoutes);
app.use(`${apiPrefix}/books`, dbRequired, booksRoutes);
app.use(`${apiPrefix}/articles`, dbRequired, articlesRoutes);
app.use(`${apiPrefix}/payments`, dbRequired, paymentsRoutes);
app.use(`${apiPrefix}/profile`, dbRequired, profileRoutes);
app.use(`${apiPrefix}/editorial`, dbRequired, editorialRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Central error handler — must be last
app.use(errorHandler);

export { app };
