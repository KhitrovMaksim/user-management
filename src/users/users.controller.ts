import { Controller, Get } from '@nestjs/common';
import { UsersServiceAbstract } from './users-service-abstract/users-service-abstract';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersServiceAbstract) {}

  @Get()
  getUsers() {
    return this.usersService.getListOfUsers();
  }
}
