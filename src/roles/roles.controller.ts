import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RolesServiceAbstract } from './roles-service-abstract/roles-service-abstract';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Role } from './schemas/role.schema';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesServiceAbstract) {}

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Get()
  getRoles(@Request() req): Promise<Role[]> {
    return this.rolesService.getListOfRoles();
  }
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Get('/:role')
  getRoleByName(@Param('role') role: string) {
    return this.rolesService.getRoleByName(role);
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Post()
  createRole(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }
}
