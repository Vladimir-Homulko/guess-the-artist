import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Types } from 'mongoose';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('start')
  public async start(@Query('userId') userId: Types.ObjectId) {
    return this.gameService.startGame(userId);
  }

  @Post('attempt')
  @HttpCode(HttpStatus.OK)
  public async attempt(
    @Query('userId') userId: string,
    @Query('artistFullName') artistFullName: string,
  ) {
    return this.gameService.attempt(userId, artistFullName);
  }

  @Get('round')
  public async getRound(@Query('userId') userId: string) {
    return this.gameService.getGameRound(userId);
  }

  @Delete('finish')
  public async finish(@Query('userId') userId: string) {
    return this.gameService.finishGame(userId);
  }
}
