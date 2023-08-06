import { LoginUserDto } from '../dtos/login-user.dto';

export abstract class AuthServiceAbstract {
  abstract login(serDto: LoginUserDto): Promise<string>;
  abstract generateToken(user: Object): string;
}
