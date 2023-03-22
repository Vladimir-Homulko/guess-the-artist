import { env } from 'node:process';
import { registerAs } from '@nestjs/config';

export const mongooseConfigFactory = registerAs('mongoose', () => ({
  uri: `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@127.0.0.1:27017/${env.MONGO_DATABASE}?authSource=admin`,
}));
