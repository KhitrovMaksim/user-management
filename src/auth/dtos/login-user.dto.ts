import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'Developer', description: 'Uniq user nickname' })
  @IsString({ message: 'Enter valid nickname' })
  readonly nickname: string;

  @ApiProperty({ example: '12345', description: 'Super secured password' })
  @IsString({ message: 'Enter valid password' })
  readonly password: string;
}
