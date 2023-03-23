import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ItunesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async getArtistRandomAlbums(
    fullName: string,
    albumsCount: number,
  ): Promise<Array<string>> {
    const itunesURL = this.configService.get<string>('itunes.url');
    const term = fullName.toLowerCase().replace(' ', '+');

    // get all artist albums
    const { data } = await this.httpService.axiosRef.get(
      `${itunesURL}/search?term=${term}&entity=album`,
    );

    const albums = [];

    let count = 0;
    while (count < albumsCount) {
      // generate random integer between 0 and response data length
      const randomInt = Math.floor(Math.random() * data.resultCount);
      albums.push(data.results[randomInt].collectionName);
      count += 1;
    }

    return albums;
  }
}
