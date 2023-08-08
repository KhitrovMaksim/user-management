import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserInterface } from '../interfaces/update-user.interface';
import { UsersPaginationDto } from '../dtos/users-pagination.dto';

export abstract class UsersServiceAbstract {
  abstract getListOfUsers(query: UsersPaginationDto): Promise<User[]>;
  abstract createUser(dto: CreateUserDto): Promise<User>;
  abstract findUserByNickname(nickname: string): Promise<User>;
  abstract updateUser(userNewData: UpdateUserInterface): Promise<User>;
  abstract deleteUser(userId: string): Promise<User>;
}
