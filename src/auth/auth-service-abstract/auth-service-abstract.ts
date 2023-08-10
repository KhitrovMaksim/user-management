import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';

export abstract class AuthServiceAbstract {
  abstract login(dto: LoginUserDto): Promise<string>;
  abstract registration(dto: RegisterUserDto): Promise<Object>;
}
