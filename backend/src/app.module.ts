import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get<MongooseModuleOptions>('mongoose');
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get<string>('redis.url'),
      }),
    }),
    UserModule,
    GameModule,
  ],
})
export class AppModule {}
