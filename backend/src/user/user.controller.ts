import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseUserDto } from './dto/base-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/start-game')
  public async getOneOrCreate(@Body() baseUserDto: BaseUserDto) {
    return this.userService.getOneOrCreate(baseUserDto);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Get(':id')
  public async getById(@Param('id') id: ObjectId) {
    return this.userService.getById(id);
  }

  @Get('top-players')
  public async getTopPlayers() {
    return this.userService.getTopPlayers();
  }
}
