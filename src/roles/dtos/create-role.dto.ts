import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Enter valid role' })
  readonly role: string;
}
