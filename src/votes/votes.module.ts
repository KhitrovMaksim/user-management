import { forwardRef, Module } from '@nestjs/common';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { VotesServiceAbstract } from './votes-service-abstract/votes-service-abstract';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';
import { VoteSchema } from './schemas/vote.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Vote', schema: VoteSchema },
    ]),
    UsersModule,
    AuthModule,
  ],
  controllers: [VotesController],
  providers: [
    {
      provide: VotesServiceAbstract,
      useClass: VotesService,
    },
  ],
  exports: [
    {
      provide: VotesServiceAbstract,
      useClass: VotesService,
    },
  ],
})
export class VotesModule {}
