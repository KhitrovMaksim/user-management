import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Developer', description: 'Uniq user nickname' })
  readonly nickname: string;
  @ApiProperty({ example: 'John', description: 'Firstname' })
  readonly firstname: string;
  @ApiProperty({ example: 'Doe', description: 'Lastname' })
  readonly lastname: string;
  @ApiProperty({ example: '12345', description: 'Super secured password' })
  readonly password: string;
  @ApiProperty({
    example: '64d019d97ce88a141ace76a8',
    description: 'Role identifier',
  })
  readonly role: mongoose.Schema.Types.ObjectId;
}
