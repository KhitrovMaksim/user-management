import { Injectable } from '@nestjs/common';
import { UsersServiceAbstract } from './users-service-abstract/users-service-abstract';

@Injectable()
export class UsersService extends UsersServiceAbstract {
  getListOfUsers() {
    return [{ id: 1, name: 'Max' }];
  }

  delete(userId: string): void {}

  registration(userId: string): void {}

  update(userId: string): void {}
}
