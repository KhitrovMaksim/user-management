import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Query,
  HttpStatus,
  HttpCode,
  Header,
  Body,
} from '@nestjs/common';
import { UsersServiceAbstract } from './users-service-abstract/users-service-abstract';
import { UsersPaginationDto } from './dtos/users-pagination.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersServiceAbstract) {}

  @Get()
  getUsers(@Query() query: UsersPaginationDto) {
    return this.usersService.getListOfUsers();
  }

  @Post()
  registration(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Put()
  update() {}

  @Delete()
  delete() {}
}
