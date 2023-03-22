import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from './entities/artist.entity';
import { Model } from 'mongoose';
import { CreateManyDto } from './dto/create-many.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private readonly artistModel: Model<Artist>,
  ) {}

  public async createMany(createManyDto: CreateManyDto) {
    const createdArtists = new this.artistModel(createManyDto);

    return this.artistModel.insertMany(createdArtists);
  }
}
