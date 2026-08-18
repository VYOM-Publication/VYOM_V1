import dotenv from 'dotenv';
import path from 'path';

// Load .env first, then allow a local override file to take precedence.
// Priority (highest → lowest): .env.local > .env
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = !IS_PRODUCTION; // test / development both get relaxed rules

/**
 * In production: throws if the variable is absent or still holds a placeholder value.
 * In development: returns the provided `devDefault` so the server can start without
 * real credentials.  A clearly labelled warning is printed so the placeholder is never
 * silently used in a real environment.
 *
 * Placeholder detection: any value that starts with '<' (matching the .env.example
 * convention of `<replace_with_…>`) is treated as unset.
 */
function requireEnv(key: string, devDefault: string): string {
  const raw = process.env[key];
  const isPlaceholder = !raw || raw.startsWith('<');

  if (IS_PRODUCTION) {
    if (isPlaceholder) {
      throw new Error(
        `[FATAL] Missing required environment variable in production: ${key}`,
      );
    }
    return raw as string;
  }

  // Development / test path
  if (isPlaceholder) {
    console.warn(
      `[config] ⚠  ${key} is not set — using dev default. ` +
      `Set a real value in apps/api/.env before running in production.`,
    );
    return devDefault;
  }

  return raw as string;
}

function optionalEnv(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

function resolveRedisUrl(): string {
  const explicitRedisUrl = process.env.REDIS_URL;
  if (explicitRedisUrl && !explicitRedisUrl.startsWith('<')) {
    return explicitRedisUrl;
  }

  const restUrl = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (restUrl && token) {
    try {
      const parsed = new URL(restUrl);
      const host = parsed.hostname;
      const port = parsed.port || '6379';
      return `rediss://:${encodeURIComponent(token)}@${host}:${port}`;
    } catch {
      // Fall through to the default if parsing fails.
    }
  }

  return optionalEnv('REDIS_URL', 'redis://localhost:6379');
}

export const config = {
  env: optionalEnv('NODE_ENV', 'development'),
  isProduction: IS_PRODUCTION,
  isDevelopment: IS_DEVELOPMENT,

  server: {
    port: parseInt(optionalEnv('PORT', '5000'), 10),
    apiVersion: optionalEnv('API_VERSION', 'v1'),
  },

  db: {
    /**
     * In production this must be a real Atlas / self-hosted URI.
     * In development the default points to a local MongoDB instance; if that
     * is also unavailable the database module will degrade gracefully (see
     * config/database.ts).
     */
    mongoUri: optionalEnv('MONGODB_URI', 'mongodb://localhost:27017/vyom_publication_dev'),
  },

  redis: {
    /**
     * Redis is optional in development — the redis module falls back to an
     * in-process memory mock when the connection cannot be established.
     *
     * Upstash exposes REST credentials, but the app uses ioredis over a TCP
     * Redis URL. If REDIS_URL is not set, we derive a TLS Redis URL from the
     * UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN values automatically.
     */
    url: resolveRedisUrl(),
  },

  jwt: {
    /**
     * Dev defaults are fixed, well-known strings — safe for local use only.
     * They are intentionally weak (not random) so the risk of accidental
     * production use is immediately obvious in a security scan.
     */
    accessSecret: requireEnv(
      'JWT_ACCESS_SECRET',
      'dev-only-access-secret-change-before-production-64bytes-placeholder!!',
    ),
    refreshSecret: requireEnv(
      'JWT_REFRESH_SECRET',
      'dev-only-refresh-secret-change-before-production-64bytes-placeholder!',
    ),
    accessExpiresIn: optionalEnv('JWT_ACCESS_EXPIRES_IN', '15m'),
    refreshExpiresIn: optionalEnv('JWT_REFRESH_EXPIRES_IN', '7d'),
  },

  cookie: {
    secret: requireEnv(
      'COOKIE_SECRET',
      'dev-only-cookie-secret-32bytes-placeholder!!',
    ),
    domain: optionalEnv('COOKIE_DOMAIN', 'localhost'),
    secure: IS_PRODUCTION,
    sameSite: (IS_PRODUCTION ? 'strict' : 'lax') as 'strict' | 'lax',
  },

  email: {
    /**
     * In development the email module uses MockEmailProvider (file-based log)
     * regardless of these values — so placeholders here are harmless.
     * In production all four fields are required.
     */
    from: requireEnv('EMAIL_FROM', 'dev@vyompublication.local'),
    fromName: optionalEnv('EMAIL_FROM_NAME', 'VYOM Publication'),
    smtpHost: requireEnv('SMTP_HOST', 'localhost'),
    smtpPort: parseInt(optionalEnv('SMTP_PORT', '1025'), 10),
    smtpUser: requireEnv('SMTP_USER', 'dev-smtp-user'),
    smtpPass: requireEnv('SMTP_PASS', 'dev-smtp-pass'),
  },

  frontendUrl: optionalEnv('FRONTEND_URL', 'http://localhost:3000'),

  rateLimit: {
    windowMs: parseInt(optionalEnv('RATE_LIMIT_WINDOW_MS', '900000'), 10),
    max: parseInt(optionalEnv('RATE_LIMIT_MAX', '100'), 10),
    authMax: parseInt(optionalEnv('AUTH_RATE_LIMIT_MAX', '10'), 10),
  },
} as const;
