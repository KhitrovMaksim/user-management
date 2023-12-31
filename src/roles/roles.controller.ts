import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesServiceAbstract } from './roles-service-abstract/roles-service-abstract';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Role } from './schemas/role.schema';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesServiceAbstract) {}

  @ApiOperation({ summary: 'Get list of roles' })
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Get()
  getRoles(): Promise<Role[]> {
    return this.rolesService.getListOfRoles();
  }

  @ApiOperation({ summary: 'Get role by name' })
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Get('/:role')
  getRoleByName(@Param('role') role: string) {
    return this.rolesService.getRoleByName(role);
  }

  @ApiOperation({ summary: 'Create new role' })
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createRole(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }
}
