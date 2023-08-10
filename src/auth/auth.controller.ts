import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthServiceAbstract } from './auth-service-abstract/auth-service-abstract';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthServiceAbstract) {}

  @UsePipes(ValidationPipe)
  @Post('login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @UsePipes(ValidationPipe)
  @Post('registration')
  registration(@Body() userDto: RegisterUserDto) {
    return this.authService.registration(userDto);
  }
}
