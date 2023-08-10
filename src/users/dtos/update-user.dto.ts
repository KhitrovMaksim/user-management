import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Developer', description: 'Uniq user nickname' })
  @IsString({ message: 'Enter valid nickname' })
  readonly nickname: string;

  @ApiProperty({ example: 'John', description: 'Firstname' })
  @IsString({ message: 'Enter valid firstname' })
  readonly firstname: string;

  @ApiProperty({ example: 'Doe', description: 'Lastname' })
  @IsString({ message: 'Enter valid lastname' })
  readonly lastname: string;

  @ApiProperty({ example: '12345', description: 'Super secured password' })
  @IsString({ message: 'Enter valid password' })
  readonly password: string;
}
