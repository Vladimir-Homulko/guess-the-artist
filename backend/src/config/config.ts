import { registerAs } from '@nestjs/config';
import { appConfigFactory } from './app.config';
import { mongooseConfigFactory } from './mongoose.config';

export const config: ReturnType<typeof registerAs>[] = [
  appConfigFactory,
  mongooseConfigFactory,
];
