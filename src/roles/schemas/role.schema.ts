import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RoleDocument = mongoose.HydratedDocument<Role>;

@Schema()
export class Role {
  @ApiProperty({
    example: '64d019d97ce88a141ace76a8',
    description: 'Role identifier',
  })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    example: 'admin',
    description: 'Role name',
  })
  @Prop()
  role: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
