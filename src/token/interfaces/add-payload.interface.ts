import mongoose from 'mongoose';

export interface AddPayloadInterface {
  id: mongoose.Schema.Types.ObjectId;
  nickname: string;
  role: string;
  updatedAt: Date;
}
