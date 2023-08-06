import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServiceAbstract } from './auth-service-abstract/auth-service-abstract';
import { LoginUserDto } from './dtos/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import mongoose from 'mongoose';
import { Hash } from '../libs/hash/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends AuthServiceAbstract {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {
    super();
  }

  async login(userDto: LoginUserDto) {
    const hashedPassword = await Hash.getHashedPassword(userDto.password);
    const user = await this.userModel.findOne({
      nickname: userDto.nickname,
      password: hashedPassword,
    });

    if (!user) {
      throw new UnauthorizedException('Nickname or password are incorrect!');
    }

    return this.generateToken(user);
  }

  generateToken(user: Object) {
    return this.jwtService.sign({ ...user });
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
