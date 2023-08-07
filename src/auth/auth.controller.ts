import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthServiceAbstract } from './auth-service-abstract/auth-service-abstract';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthServiceAbstract) {}

  @Post('login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Post('registration')
  registration(@Body() userDto: RegisterUserDto) {
    return this.authService.registration(userDto);
  }
}
