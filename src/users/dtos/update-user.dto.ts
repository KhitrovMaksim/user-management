export class UpdateUserDto {
  readonly token: string;
  readonly unmodifiedSince: Date;
  readonly nickname: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly password: string;
}
