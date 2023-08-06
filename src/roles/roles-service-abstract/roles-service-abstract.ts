import { Role } from '../schemas/role.schema';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { Roles } from '../enums/role.enum';

export abstract class RolesServiceAbstract {
  abstract getListOfRoles(): Promise<Role[]>;
  abstract getRoleByName(roleName: Roles): Promise<Role>;
  abstract createRole(dto: CreateRoleDto): Promise<Role>;
}
