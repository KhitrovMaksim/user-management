import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type VoteDocument = mongoose.HydratedDocument<Vote>;

@Schema()
export class Vote {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  voter: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  profile: User;

  @Prop()
  vote: number;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
