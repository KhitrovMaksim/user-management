import { IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'Enter valid nickname' })
  readonly nickname: string;
  @IsString({ message: 'Enter valid firstname' })
  readonly firstname: string;
  @IsString({ message: 'Enter valid lastname' })
  readonly lastname: string;
  @IsString({ message: 'Enter valid password' })
  readonly password: string;
}
