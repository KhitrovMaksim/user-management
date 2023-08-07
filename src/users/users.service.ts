import { Injectable } from '@nestjs/common';
import { UsersServiceAbstract } from './users-service-abstract/users-service-abstract';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { RolesServiceAbstract } from '../roles/roles-service-abstract/roles-service-abstract';
import { Roles } from '../roles/enums/role.enum';
import { Hash } from '../libs/hash/hash';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService extends UsersServiceAbstract {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private roleService: RolesServiceAbstract,
  ) {
    super();
  }

  async getListOfUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async deleteUser(userId: string): Promise<User> {
    const users = await this.userModel.findOne({ _id: userId });
    return users;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await Hash.getHashedPassword(dto.password);
    const role = await this.roleService.getRoleByName(Roles.USER);
    const newUserWithExtraData = await this.userModel.create({
      ...dto,
      password: hashedPassword,
      role: role._id,
    });
    const jsonNewUser = JSON.stringify(newUserWithExtraData);
    const newUserOnlyWithUserData = JSON.parse(jsonNewUser);
    return newUserOnlyWithUserData;
  }

  async updateUser(dto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ nickname: dto.nickname });
    return user;
  }

  async findUserByNickname(nickname: string): Promise<User> {
    return this.userModel.findOne({ nickname });
  }
}
