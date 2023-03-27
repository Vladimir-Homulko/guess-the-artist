import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistService } from './artist.service';
import { Artist, ArtistSchema } from './entities/artist.entity';
import { ItunesModule } from '../itunes/itunes.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    ItunesModule,
  ],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
