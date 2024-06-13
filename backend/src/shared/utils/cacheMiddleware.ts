import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';

const redisHost = process.env.REDIS_HOST || 'redis';
const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);

const client = createClient({
  url: `redis://${redisHost}:${redisPort}`
});

client.on('error', (err) => console.error('Redis error:', err));

client.connect().catch(console.error);

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl;

  try {
    const data = await client.get(key);
    if (data) {
      console.log('Data served from cache');
      return res.send(JSON.parse(data));
    } else {
      const originalSend = res.send.bind(res);
      res.send = (body: any): Response => {
        client.setEx(key, 3600, JSON.stringify(body)).then(() => {
          console.log('Redis setEx success');
        }).catch((err) => {
          console.error('Redis setEx error:', err);
        });
        return originalSend(body);
      };
      next();
    }
  } catch (err) {
    console.error('Redis get error:', err);
    next();
  }
};

// Utility function to invalidate cache
export const invalidateCache = async (key: string) => {
  try {
    await client.del(key);
    console.log(`Cache for key ${key} invalidated`);
  } catch (err) {
    console.error(`Error invalidating cache for key ${key}:`, err);
  }
};
