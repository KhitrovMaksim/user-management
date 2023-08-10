import { Injectable } from '@nestjs/common';
import { RolesServiceAbstract } from './roles-service-abstract/roles-service-abstract';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Role } from './schemas/role.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class RolesService extends RolesServiceAbstract {
  constructor(@InjectModel(Role.name) private roleModel: mongoose.Model<Role>) {
    super();
  }

  createRole(dto: CreateRoleDto): Promise<Role> {
    const role = this.roleModel.create(dto);
    return role;
  }

  async getListOfRoles(): Promise<Role[]> {
    const roles = await this.roleModel.find();
    return roles;
  }

  async getRoleByName(roleName: string): Promise<Role> {
    const role = await this.roleModel.findOne({ role: roleName });
    return role;
  }

  async getRoleById(roleId: Role): Promise<Role> {
    const role = await this.roleModel.findOne({ _id: roleId });
    return role;
  }
}
