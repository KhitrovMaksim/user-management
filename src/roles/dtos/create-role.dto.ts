import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Role name',
  })
  @IsString({ message: 'Enter valid role' })
  readonly role: string;
}
