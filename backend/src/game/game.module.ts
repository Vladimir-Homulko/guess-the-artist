import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ArtistModule } from '../artist/artist.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
