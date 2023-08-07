import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RoleDocument = mongoose.HydratedDocument<Role>;

@Schema()
export class Role {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  role: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
