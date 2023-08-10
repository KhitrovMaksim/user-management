import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Enter valid nickname' })
  readonly nickname: string;
  @IsString({ message: 'Enter valid password' })
  readonly password: string;
}
