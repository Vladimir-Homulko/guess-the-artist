import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist } from './entities/artist.entity';
import { Model } from 'mongoose';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Command } from 'nestjs-command';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private readonly artistModel: Model<Artist>,
  ) {}

  public async createMany(
    createArtistDtoArr: Array<CreateArtistDto>,
  ): Promise<void> {
    const createdArtists = createArtistDtoArr.map(
      (dto) => new this.artistModel(dto),
    );
    await this.artistModel.insertMany(createdArtists);
  }
}
