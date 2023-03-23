import { env } from 'node:process';
import { registerAs } from '@nestjs/config';

export const itunesConfigFactory = registerAs('itunes', () => ({
  url: env.ITUNES_URL,
}));
