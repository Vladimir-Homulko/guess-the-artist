import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class ArtistsSeed {
  constructor(private readonly artistService: ArtistService) {}

  @Command({ command: 'create:artists', describe: 'create artists' })
  async createArtists() {
    await this.artistService.createMany([
      { fullName: 'Taylor Swift' },
      { fullName: 'The Weeknd' },
      { fullName: 'Miley Cyrus' },
      { fullName: 'KAROL G' },
      { fullName: 'Bad Bunny' },
      { fullName: 'SZA' },
      { fullName: 'Feid' },
      { fullName: 'Metro Boomin' },
      { fullName: 'Harry Styles' },
      { fullName: 'Ed Sheeran' },
    ]);
  }
}
