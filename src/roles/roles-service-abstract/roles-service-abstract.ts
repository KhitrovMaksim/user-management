import { Role } from '../schemas/role.schema';
import { CreateRoleDto } from '../dtos/create-role.dto';

export abstract class RolesServiceAbstract {
  abstract getListOfRoles(): Promise<Role[]>;
  abstract getRoleByName(roleName: string): Promise<Role>;
  abstract getRoleById(roleId: Role): Promise<Role>;
  abstract createRole(dto: CreateRoleDto): Promise<Role>;
}
