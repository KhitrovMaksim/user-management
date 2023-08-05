export abstract class UsersServiceAbstract {
  abstract getListOfUsers(): Object[];
  abstract registration(userId: string): void; // ToDo: updateRegistrationDto
  abstract update(userId: string): void; // ToDo: updateUserDto
  abstract delete(userId: string): void;
}
