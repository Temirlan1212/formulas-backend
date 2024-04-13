import { Messages } from '../../core/consts';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: Messages['MIN_LENGTH_6'] })
  readonly password: string;
}
