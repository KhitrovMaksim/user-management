import {
  Controller,
  Delete,
  Get,
  Put,
  Query,
  HttpStatus,
  Headers,
  Body,
  UseGuards,
  Param,
  HttpException,
  Post,
  Request,
} from '@nestjs/common';
import { UsersServiceAbstract } from './users-service-abstract/users-service-abstract';
import { UsersPaginationDto } from './dtos/users-pagination.dto';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersServiceAbstract) {}

  @Get()
  getUsers(@Query() query: UsersPaginationDto) {
    return this.usersService.getListOfUsers(query);
  }

  @Get('rating')
  getRating() {
    return this.usersService.getListOfUsersWithRating();
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
    @Headers('if-unmodified-since') header: string,
  ) {
    const unmodifiedSince: Date = new Date(header);

    if (
      unmodifiedSince! instanceof Date &&
      !isFinite(unmodifiedSince.getTime())
    )
      throw new HttpException(
        'If-Unmodified-Since header not exist',
        HttpStatus.PRECONDITION_REQUIRED,
      );

    if (id.length !== 24)
      throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
    return this.usersService.updateUser({ ...userDto, id, unmodifiedSince });
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    if (id.length !== 24)
      throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
    return this.usersService.deleteUser(id);
  }
}
