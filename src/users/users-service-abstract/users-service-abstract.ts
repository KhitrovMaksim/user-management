import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export abstract class UsersServiceAbstract {
  abstract getListOfUsers(): Promise<User[]>;
  abstract createUser(dto: CreateUserDto): Promise<User>;
  abstract findUserByNickname(nickname: string): Promise<User>;
  abstract updateUser(dto: UpdateUserDto): Promise<User>;
  abstract deleteUser(userId: string): Promise<User>;
}
