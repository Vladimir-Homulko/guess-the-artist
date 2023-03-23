import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ArtistDocument = Artist & Document;

@Schema({
  timestamps: true,
})
export class Artist {
  @Prop({ required: true })
  fullName: string;

  @Prop(
    raw({
      name: { type: String },
      previewURL: { type: String },
    }),
  )
  albums: Record<string, string>;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
