import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Roles } from '../enums/role.enum';

export type RoleDocument = mongoose.HydratedDocument<Role>;

@Schema()
export class Role {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  role: Roles;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
