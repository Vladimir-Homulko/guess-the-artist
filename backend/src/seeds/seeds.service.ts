import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class AdminSeed {
  constructor(private readonly artistService: ArtistService) {}

  @Command({ command: 'create:artists', describe: 'create artists' })
  async createArtists() {
    // TODO: check it should be partial artist obj
    // await this.artistService.createMany([
    //   { usernames },
    //   'The Weeknd',
    //   'Miley Cyrus',
    //   'KAROL G',
    //   'Bad Bunny',
    //   'SZA',
    //   'Feid',
    //   'Metro Boomin',
    //   'Harry Styles',
    //   'Ed Sheeran',
    // ]);
  }
}
