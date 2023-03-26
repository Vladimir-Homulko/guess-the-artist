import { Artist } from '../artist/entities/artist.entity';

export type TGameCache = {
  username: string;
  points: number;
  attempts: number;
  artist: Artist;
  isWinner: boolean;
  isGameOver: boolean;
};
