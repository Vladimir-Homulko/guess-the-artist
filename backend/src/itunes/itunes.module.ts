import { Module } from '@nestjs/common';
import { ItunesService } from './itunes.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ItunesService],
  exports: [ItunesService],
})
export class ItunesModule {}
