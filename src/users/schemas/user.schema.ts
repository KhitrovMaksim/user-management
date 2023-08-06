import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from '../../roles/schemas/role.schema';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  nickname: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true })
  role: Role;

  @Prop({ default: null })
  last_vote: Date;

  @Prop({ default: new Date(), immutable: true })
  created_at: Date;

  @Prop({ default: new Date() })
  updated_at: Date;

  @Prop({ default: null })
  deleted_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
