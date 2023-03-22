import { Body, Controller, Post } from '@nestjs/common';
import { CreateOneDto } from './dto/create-one.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() createUserDto: CreateOneDto) {
    return this.userService.create(createUserDto);
  }
}
