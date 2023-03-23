import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SeedsModule } from './seeds/seeds.module';
import { ItunesModule } from './itunes/itunes.module';

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
    UserModule,
    SeedsModule,
    ItunesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
