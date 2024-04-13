import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtDto } from './dto/jwt.dto';
import { Messages } from '../core/consts';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtDto): Promise<any> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException(
        Messages['INVALID_TOKEN'],
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
