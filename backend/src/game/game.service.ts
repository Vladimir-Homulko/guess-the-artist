import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Types } from 'mongoose';
import { ArtistService } from '../artist/artist.service';
import { Cache } from 'cache-manager';
import { TGameCache } from '../common/types';
import { GameDto } from './dto/game.dto';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class GameService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly userService: UserService,
    private readonly artistService: ArtistService,
  ) {}

  public async startGame(userId: Types.ObjectId): Promise<GameDto> {
    const user = await this.userService.findById(userId);
    const randomArtist = await this.artistService.getRandomArtist();
    const artist = await this.artistService.updateArtistAlbums(
      randomArtist.fullName,
    );

    await this.cacheManager.set(
      userId.toString(),
      {
        username: user.username,
        points: user.points,
        isWinner: false,
        attempts: 5,
        artist,
        isGameOver: false,
      },
      0,
    );

    return {
      username: user.username,
      points: user.points,
      albumName: artist.albums[4],
      isWinner: false,
      attempts: 5,
      isGameOver: false,
    };
  }

  public async getGameRound(userId: string): Promise<GameDto> {
    const { username, points, attempts, artist, isWinner, isGameOver } =
      await this.cacheManager.get<TGameCache>(userId);

    return {
      username,
      points,
      attempts,
      albumName: artist.albums[attempts - 1] ? artist.albums[attempts - 1] : '',
      isWinner,
      isGameOver,
    };
  }

  public async attempt(
    userId: string,
    artistFullName: string,
  ): Promise<GameDto> {
    const { username, points, attempts, artist } =
      await this.cacheManager.get<TGameCache>(userId);

    const isWinner =
      artistFullName.toLowerCase() === artist.fullName.toLowerCase();

    if (isWinner) {
      return this.gameOver(userId, points, true, username, artist);
    }

    if (attempts === 1) {
      return this.gameOver(userId, points, false, username, artist);
    }

    await this.cacheManager.set(
      userId.toString(),
      {
        username,
        points,
        artist,
        attempts: attempts - 1,
        isGameOver: false,
      },
      0,
    );

    return {
      username,
      points,
      attempts: attempts - 1,
      isWinner: false,
      albumName: artist.albums[attempts - 1],
      isGameOver: false,
    };
  }

  public async gameOver(
    userId: string,
    points: number,
    isWinner: boolean,
    username: string,
    artist: Artist,
  ): Promise<GameDto> {
    const result = {
      username,
      points,
      attempts: 0,
      artist,
      isWinner,
      isGameOver: true,
    };

    if (isWinner) {
      const user = await this.userService.update(userId, {
        points: points + 5,
      });
      result.points = user.points;
    }

    await this.cacheManager.set(userId, result, 0);

    return {
      username,
      points: result.points,
      attempts: 0,
      albumName: '',
      isWinner,
      isGameOver: true,
    };
  }

  public async finishGame(userId: string): Promise<void> {
    return this.cacheManager.del(userId);
  }
}
