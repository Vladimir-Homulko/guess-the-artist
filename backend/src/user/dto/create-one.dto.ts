import { IsString } from 'class-validator';

export class CreateOneDto {
  @IsString()
  username: string;
}
