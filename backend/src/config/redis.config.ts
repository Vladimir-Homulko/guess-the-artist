import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

export const redisConfigFactory = registerAs('redis', () => ({
  url: env.REDIS_URL,
}));
