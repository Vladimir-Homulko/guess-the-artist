import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('random')
  public async getRandomArtist() {
    return this.artistService.getRandomArtist();
  }

  @Patch(':fullName/album')
  public async updateAlbums(@Param('fullName') fullName) {
    return this.artistService.updateArtistAlbums(fullName);
  }
}
