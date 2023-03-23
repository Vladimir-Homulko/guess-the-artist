import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ArtistsSeed } from './seeds.service';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports: [CommandModule, ArtistModule],
  providers: [ArtistsSeed],
  exports: [ArtistsSeed],
})
export class SeedsModule {}
