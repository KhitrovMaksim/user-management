import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthServiceAbstract } from './auth-service-abstract/auth-service-abstract';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthServiceAbstract) {}

  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }
}
