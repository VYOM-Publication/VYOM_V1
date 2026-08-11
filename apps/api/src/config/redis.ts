import Redis from 'ioredis';
import { config } from './index';
import { logger } from '../shared/utils/logger';

class InMemoryRedisMock {
  private store = new Map<string, { value: string; expiresAt: number }>();

  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key: string, value: string, option?: string, duration?: string | number): Promise<'OK'> {
    let expiresAt = Infinity;
    if (option === 'EX' && duration) {
      const expSecs = typeof duration === 'string' ? parseInt(duration, 10) : duration;
      expiresAt = Date.now() + expSecs * 1000;
    }
    this.store.set(key, { value, expiresAt });
    return 'OK';
  }

  async del(key: string): Promise<number> {
    return this.store.delete(key) ? 1 : 0;
  }

  async ping(): Promise<'PONG'> {
    return 'PONG';
  }

  on(_event: string, _callback: (...args: unknown[]) => void): this {
    // Silent mock — events not supported in in-memory implementation
    return this;
  }

  async connect(): Promise<void> {
    logger.info('Simulated memory cache connected');
  }

  async quit(): Promise<void> {
    this.store.clear();
  }
}

let redisClient: any = null;
let isMock = false;

export function getRedisClient(): any {
  if (redisClient) return redisClient;

  // If in production, require proper Redis connection. 
  // In development/test, we allow mock fallback if connection fails.
  try {
    redisClient = new Redis(config.redis.url, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      connectTimeout: 2000,
    });

    redisClient.on('connect', () => {
      isMock = false;
      logger.info('Redis connected successfully');
    });

    redisClient.on('error', (err: any) => {
      if (!isMock) logger.error('Redis connection error occurred', { err });
    });
  } catch (err) {
    logger.error('Failed to instantiate Redis client', { err });
    setupFallback();
  }

  return redisClient;
}

function setupFallback() {
  if (isMock) return;
  isMock = true;
  // Disconnect the real ioredis client to stop reconnection attempts
  if (redisClient && typeof redisClient.disconnect === 'function') {
    try { redisClient.disconnect(); } catch { /* ignore */ }
  }
  redisClient = new InMemoryRedisMock();
  logger.warn('⚠️ Fallback to In-Memory cache initiated. Redis features will be simulated.');
}

export async function connectRedis(): Promise<void> {
  const client = getRedisClient();
  try {
    await client.connect();
  } catch (err) {
    logger.error('Failed to establish connection to Redis server.', { err });
    if (!config.isProduction) {
      setupFallback();
    } else {
      throw err; // In production, fail-fast
    }
  }
}

export async function disconnectRedis(): Promise<void> {
  if (redisClient) {
    if (typeof redisClient.quit === 'function') {
      await redisClient.quit();
    }
    redisClient = null;
  }
}

export function isRedisMocked(): boolean {
  return isMock;
}
