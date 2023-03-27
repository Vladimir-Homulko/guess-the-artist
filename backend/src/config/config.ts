import { registerAs } from '@nestjs/config';
import { appConfigFactory } from './app.config';
import { mongooseConfigFactory } from './mongoose.config';
import { itunesConfigFactory } from './itunes.config';
import { redisConfigFactory } from './redis.config';

export const config: ReturnType<typeof registerAs>[] = [
  appConfigFactory,
  mongooseConfigFactory,
  itunesConfigFactory,
  redisConfigFactory,
];
