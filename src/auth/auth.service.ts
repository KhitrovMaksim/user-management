import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthServiceAbstract } from './auth-service-abstract/auth-service-abstract';
import { LoginUserDto } from './dtos/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import mongoose from 'mongoose';
import { UsersServiceAbstract } from '../users/users-service-abstract/users-service-abstract';
import { TokenService } from '../token/token.service';
import { Hash } from '../libs/hash/hash';
import { RolesServiceAbstract } from '../roles/roles-service-abstract/roles-service-abstract';
import { Role } from '../roles/schemas/role.schema';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService extends AuthServiceAbstract {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private readonly usersService: UsersServiceAbstract,
    private readonly rolesService: RolesServiceAbstract,
    private readonly tokenService: TokenService,
  ) {
    super();
  }

  public async registration(dto: RegisterUserDto) {
    try {
      const hashedPassword = await Hash.getHashedPassword(dto.password);
      const role: Role = await this.rolesService.getRoleByName('user');
      const newUser = await this.usersService.createUser({
        ...dto,
        password: hashedPassword,
        role: role._id,
      });
      const token = await this.tokenService.generateJwtToken({
        id: newUser._id,
        nickname: newUser.nickname,
        role: role.role,
        updatedAt: newUser.updated_at,
      });
      return { ...newUser, token };
    } catch (e) {
      return e.message;
    }
  }

  public async login(userDto: LoginUserDto) {
    const user: User = await this.usersService.findUserByNickname(
      userDto.nickname,
    );

    if (!user)
      throw new NotFoundException('User with this nickname was not found.');

    const hashedPassword = await Hash.getHashedPassword(userDto.password);

    if (hashedPassword !== user.password)
      throw new UnauthorizedException('Incorrect password.');

    const role: Role = await this.rolesService.getRoleById(user.role);

    const payload = {
      id: user._id,
      nickname: user.nickname,
      role: role.role,
      updatedAt: user.updated_at,
    };
    return this.tokenService.generateJwtToken(payload);
  }
}
