import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtDto } from './dto/jwt.dto';
import { Messages } from '../core/consts';
import {
  LoginStatus,
  RegistrationStatus,
  TokenStatus,
} from '../core/types/response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(userDto: RegisterDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {};
    try {
      status.data = await this.usersService.create(userDto);
      status.token = this._createToken({
        username: status.data.username,
      }).token;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return status;
  }

  async login(loginUserDto: LoginDto): Promise<LoginStatus> {
    // find user in db

    const user = await this.usersService.findByUsername(loginUserDto);

    // generate and sign token
    const { token } = this._createToken({ username: user.username });

    return {
      token,
      data: user as User,
    };
  }

  private _createToken({ username }: JwtDto): {
    expiresIn: string;
    token: string;
  } {
    const user: JwtDto = { username };
    const token = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      token,
    };
  }

  async verifyToken(token: string): Promise<TokenStatus> {
    if (!token)
      throw new HttpException(
        Messages['NO_TOKEN_PROVIDED'],
        HttpStatus.BAD_REQUEST,
      );

    let status: TokenStatus = {};

    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new HttpException(
        Messages['INVALID_TOKEN'],
        HttpStatus.BAD_REQUEST,
      );
    }

    return status;
  }

  async validateUser(payload: JwtDto): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException(
        Messages['INVALID_TOKEN'],
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
