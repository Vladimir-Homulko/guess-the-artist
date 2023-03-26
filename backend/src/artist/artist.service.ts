import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from './entities/artist.entity';
import { Model } from 'mongoose';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ItunesService } from '../itunes/itunes.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private readonly artistModel: Model<Artist>,
    private readonly itunesService: ItunesService,
  ) {}

  public async createMany(
    createArtistDtoArr: Array<CreateArtistDto>,
  ): Promise<void> {
    const createdArtists = createArtistDtoArr.map(
      (dto) => new this.artistModel(dto),
    );
    await this.artistModel.insertMany(createdArtists);
  }

  public async getRandomArtist(): Promise<ArtistDocument> {
    const data = await this.artistModel.aggregate([{ $sample: { size: 1 } }]);
    return data[0];
  }

  public async updateArtistAlbums(fullName: string): Promise<ArtistDocument> {
    const albums = await this.itunesService.getArtistRandomAlbums(fullName, 5);

    const artist = await this.artistModel.findOneAndUpdate(
      {
        fullName,
      },
      {
        albums,
      },
    );

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }
}
