import mongoose from 'mongoose';

export class CreateUserDto {
  readonly nickname: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly password: string;
  readonly role: mongoose.Schema.Types.ObjectId;
}
