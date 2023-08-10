import mongoose from 'mongoose';
import { Role } from '../../roles/schemas/role.schema';

export interface JwtPayloadInterface {
  payload: {
    id: mongoose.Schema.Types.ObjectId;
    nickname: string;
    role: Role;
    updatedAt: Date;
  };
}
