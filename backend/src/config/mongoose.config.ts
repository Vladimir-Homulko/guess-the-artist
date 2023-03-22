import { env } from 'node:process';
import { registerAs } from '@nestjs/config';

export const mongooseConfigFactory = registerAs('mongoose', () => ({
  uri: env.MONGO_URL,
}));
