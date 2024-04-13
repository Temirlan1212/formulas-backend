import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RegistrationStatus } from '../core/types/response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: RegisterDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus =
      await this.authService.register(createUserDto);

    return result;
  }

  @Post('login')
  public async login(
    @Body(ValidationPipe) loginUserDto: LoginDto,
  ): Promise<any> {
    return await this.authService.login(loginUserDto);
  }

  @Post('verify-token')
  public async verifyToken(@Body() { token }: { token: string }): Promise<any> {
    return await this.authService.verifyToken(token);
  }
}
