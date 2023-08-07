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
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { TokenService } from '../token/token.service';
import { Hash } from '../libs/hash/hash';

@Injectable()
export class AuthService extends AuthServiceAbstract {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private readonly usersService: UsersServiceAbstract,
    private readonly tokenService: TokenService,
  ) {
    super();
  }

  public async registration(dto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(dto);
      const token = await this.tokenService.generateJwtToken(newUser);
      return { ...newUser, token };
    } catch (e) {
      return e.message;
    }
  }

  public async login(userDto: LoginUserDto) {
    const user = await this.usersService.findUserByNickname(userDto.nickname);

    if (!user)
      throw new NotFoundException('User with this nickname was not found.');

    const hashedPassword = await Hash.getHashedPassword(userDto.password);

    if (hashedPassword !== user.password)
      throw new UnauthorizedException('Incorrect password.');

    return this.tokenService.generateJwtToken(user);
  }
}
