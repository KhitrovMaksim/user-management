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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthServiceAbstract) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: Promise<string> })
  @UsePipes(ValidationPipe)
  @Post('login')
  login(@Body() userDto: LoginUserDto): Promise<string> {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, type: Promise<Object> })
  @UsePipes(ValidationPipe)
  @Post('registration')
  registration(@Body() userDto: RegisterUserDto): Promise<Object> {
    return this.authService.registration(userDto);
  }
}
