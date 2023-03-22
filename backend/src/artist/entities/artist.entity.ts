import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TAlbum } from '../common/types';

export type ArtistDocument = Artist & Document;

@Schema({
  timestamps: true,
})
export class Artist {
  @Prop({ required: true })
  fullName: string;

  @Prop()
  albums: Array<TAlbum>;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
