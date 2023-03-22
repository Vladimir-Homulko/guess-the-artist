import { IsArray } from 'class-validator';

export class CreateManyDto {
  @IsArray()
  usernames: string[];
}
