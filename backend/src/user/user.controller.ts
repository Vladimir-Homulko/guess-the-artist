import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseUserDto } from './dto/base-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/enter-to-game')
  public async findOneOrCreate(@Body() baseUserDto: BaseUserDto) {
    return this.userService.findOneOrCreate(baseUserDto);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Get('top-players')
  public async getTopPlayers() {
    return this.userService.getTopPlayers();
  }
}
