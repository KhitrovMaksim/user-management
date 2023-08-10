import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from '../../roles/schemas/role.schema';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({
    example: '64d019d97ce88a141ace76a8',
    description: 'User identifier',
  })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'Developer', description: 'Uniq user nickname' })
  @Prop({ required: true, unique: true })
  nickname: string;

  @ApiProperty({ example: 'John', description: 'Firstname' })
  @Prop({ required: true })
  firstname: string;

  @ApiProperty({ example: 'Doe', description: 'Lastname' })
  @Prop({ required: true })
  lastname: string;

  @ApiProperty({ example: '12345', description: 'Super secured password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'admin', description: 'User role' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true })
  role: Role;

  @ApiProperty({
    example: '2021-07-02T13:06:53.422Z',
    description: 'Last voted date',
  })
  @Prop({ default: null })
  last_vote: Date;

  @ApiProperty({
    example: '2021-07-02T13:06:53.422Z',
    description: 'Date when user was created',
  })
  @Prop({ default: new Date(), immutable: true })
  created_at: Date;

  @ApiProperty({
    example: '2021-07-02T13:06:53.422Z',
    description: 'Date when user was updated',
  })
  @Prop({ default: new Date() })
  updated_at: Date;

  @ApiProperty({
    example: '2021-07-02T13:06:53.422Z',
    description: 'Date when user was deleted',
  })
  @Prop({ default: null })
  deleted_at: Date;

  @ApiProperty({
    example: 'https://google.com/avatar.jpeg',
    description: 'Url to user avatar',
  })
  @Prop()
  avatar_url: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
