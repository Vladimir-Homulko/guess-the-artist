import { IsString } from 'class-validator';

export class BaseUserDto {
  @IsString()
  username: string;
}
