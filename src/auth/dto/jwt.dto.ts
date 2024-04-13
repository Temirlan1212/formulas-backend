import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class JwtDto extends PartialType(CreateUserDto) {}
