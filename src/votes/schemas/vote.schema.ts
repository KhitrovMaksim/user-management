import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export type VoteDocument = mongoose.HydratedDocument<Vote>;

@Schema()
export class Vote {
  @ApiProperty({
    example: '64d019d97ce88a141ace76a8',
    description: 'User identifier as voter',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  voter: User;

  @ApiProperty({
    example: '64d019d97ce88a141ace76a8',
    description: 'User identifier as profile',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  profile: User;

  @ApiProperty({
    example: 'increment or decrement',
    description: 'Vote',
  })
  @Prop()
  vote: number;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
