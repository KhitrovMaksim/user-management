import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesServiceAbstract } from './roles-service-abstract/roles-service-abstract';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Roles } from './enums/role.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesServiceAbstract) {}

  @Get()
  getRoles() {
    return this.rolesService.getListOfRoles();
  }

  @Get('/:role')
  getRoleByName(@Param('role') role: Roles) {
    return this.rolesService.getRoleByName(role);
  }

  @Post()
  createRole(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }
}
