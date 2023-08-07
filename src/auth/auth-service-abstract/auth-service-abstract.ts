import { LoginUserDto } from '../dtos/login-user.dto';
import { CreateUserDto } from '../../users/dtos/create-user.dto';

export abstract class AuthServiceAbstract {
  abstract login(dto: LoginUserDto): Promise<string>;
  abstract registration(dto: CreateUserDto): Promise<Object>;
}
