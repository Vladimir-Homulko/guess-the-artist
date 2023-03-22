import { registerAs } from '@nestjs/config';
import { appConfigFactory } from './app.config';

export const config: ReturnType<typeof registerAs>[] = [appConfigFactory];
